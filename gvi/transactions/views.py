from django.shortcuts import render, get_object_or_404
from django.http import Http404, JsonResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt

from .models import Transaction, Category, Subcategory
from accounts.models import Account, Currency

from decimal import *


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

    return render(request, 'transactions/b_detail.html', context)


def balance_detail(request, pk):
    transactions = Transaction.objects.order_by('-date')
    category = Category.objects.all()
    subcategory = Subcategory.objects.all()

    bank_accounts = Account.objects.filter(account_type='b')
    cash_accounts = Account.objects.filter(account_type='c')
    currencies = Currency.objects.all()
    account = get_object_or_404(Account, pk=pk)

    context = {'a': account,
               'category': category,
               'subcategory': subcategory,
               'transactions': transactions}
    return render(request, 'transactions/b_detail.html', context)


@csrf_exempt
def new_transaction(request, pk):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                t_type = request.POST['type']
                cat = request.POST['category']
                sub = request.POST['subcategory']
                date = request.POST['date']
                comment = request.POST['comment']
                amount = request.POST['amount']
                category = Category.objects.get(name=cat)
                subcategory = Subcategory.objects.get(name=sub)
                account_id = request.POST['id']
                account = get_object_or_404(Account, pk=account_id)

                if t_type == 'i':
                    account.balance += Decimal(float(amount))
                else:
                    account.balance -= Decimal(float(amount))
                account.save()

                transaction = Transaction(transaction_type=t_type, category=category, subcategory=subcategory,
                                          comment=comment, amount=amount, balance=account.balance, date=date,
                                          account=account)
                transaction.save()

                return JsonResponse({'code': '200',
                                     'msg': 'transaction added'})

            except KeyError as e:
                pass
        if request.method == 'GET':
            try:
                t_id = request.GET['id']
                transaction = get_object_or_404(Transaction, pk=t_id)
                context = {'id': transaction.pk,
                           'type': transaction.transaction_type,
                           'category': transaction.category.name,
                           'subcategory': transaction.subcategory.name,
                           'date': transaction.date,
                           'amount': transaction.amount,
                           'comment': transaction.comment,
                           }
                return JsonResponse(context)
            except KeyError as e:
                print e
                print "KeyError in GET in new_transaction"
        else:
            raise Http404(request)
    else:
        print 'new_transaction not ajax'
        raise Http404(request)


@csrf_exempt
def update_delete_transaction(request, pk):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                t_id = request.POST['id']
                t_type = request.POST['type']
                cat = request.POST['category']
                sub = request.POST['subcategory']
                date = request.POST['date']
                comment = request.POST['comment']
                amount = request.POST['amount']
                category = Category.objects.get(name=cat)
                subcategory = Subcategory.objects.get(name=sub)
                account_id = request.POST['idAccount']
                account = get_object_or_404(Account, pk=account_id)
                transaction = Transaction.objects.get(pk=t_id)

                if t_type == 'i':
                    account.balance += Decimal(float(amount))
                else:
                    account.balance -= Decimal(float(amount))
                account.save()
                transaction.transaction_type = t_type
                transaction.category = category
                transaction.subcategory = subcategory
                transaction.comment = comment
                transaction.date = date
                transaction.save()

                return JsonResponse({'code': '200',
                                     'msg': 'transaction added'})

            except KeyError as e:
                print e.args
                print "KeyError at update_delete_transaction POST"

        if request.method == 'GET':
            try:
                transaction_id = request.GET['id']
                transaction = Transaction.objects.get(pk=transaction_id)
                transaction.delete()

                return JsonResponse({'code': '200',
                                     'msg': 'transaction deleted',
                                     'id': transaction_id})

            except KeyError as e:
                print e.args
                print "KeyError at update_delete_transaction GET"
                raise HttpResponseServerError(request)

        else:
            print "update_delete_transaction request.method not supported"
            raise Http404(request)
    else:
        print "update_delete_transaction not ajax"
        raise Http404(request)


@csrf_exempt
def cats_subs(request):
    json_response = Category.to_dict()
    return JsonResponse(json_response)


def new_del_sub(request):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                cat = request.POST['category']
                name = request.POST['subcategory']
                category = get_object_or_404(Category, name=cat)
                subcategory = Subcategory(name=name, category=category)
                subcategory.save()

                return JsonResponse({'code': '200',
                                     'msg': 'ok'})

            except KeyError as e:
                print "KeyError new_del_sub POST"
                print e.args
                return HttpResponseServerError(request)
        else:
            try:
                sub_id = request.GET['id']
                sub = get_object_or_404(Subcategory, pk=sub_id)
                sub.delete()
                return JsonResponse({'code': '200',
                                     'msg': 'deleted'})

            except KeyError as e:
                print e.args
                print "KeyError new_del_sub GET"
                raise HttpResponseServerError
    else:
        print "new sub not ajax "
        raise Http404(request)
