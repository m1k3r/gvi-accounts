from django.shortcuts import render

from .models import Transaction, Category, Subcategory
from accounts.models import Account, Currency


def index(request):
    transactions = Transaction.objects.order_by('-date')
    category = Category.objects.all()
    subcategory = Subcategory.objects.all()

    bank_accounts = Account.objects.filter(account_type='b')
    cash_accounts = Account.objects.filter(account_type='c')
    currencies = Currency.objects.all()

    context = {'transactions': transactions,
               'category': category,
               'subcategory': subcategory,
               'bank_acc': bank_accounts,
               'cash_acc': cash_accounts,
               'currencies': currencies,
               }

    return render(request, 'transactions/dashboard.html', context)


def search_transactions(request):
    print "**********"
    print request.body
    print "**********"
    enableCategory = request.POST.get('enableCategory')
    enableSubcategory = request.POST.get('enableSubcategory')
    if enableCategory and enableSubcategory:
        categorySelect = request.POST.get('categorySelect')
        subcategorySelect = request.POST.get('subcategorySelect')
        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')
        transactions = Transaction.objects.filter(category__name=categorySelect)
        transactions = transactions.filter(subcategory__name=subcategorySelect)
        transactions = transactions.filter(date__range=[fromDate, toDate]).order_by('-date')
    
    elif enableCategory:
        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')
        categorySelect = request.POST.get('categorySelect')
        transactions = Transaction.objects.filter(category__name=categorySelect)
        transactions = transactions.filter(date__range=[fromDate, toDate]).order_by('-date')
    
    else:
        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')
        transactions = Transaction.objects.filter(date__range=[fromDate, toDate]).order_by('-date')

    category = Category.objects.all()
    subcategory = Subcategory.objects.all()
    context = {'transactions': transactions,
               'category': category,
               'subcategory': subcategory,
               }

    return render(request, 'transactions/dashboard.html', context)
