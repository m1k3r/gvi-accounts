from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseForbidden
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse

from .models import Transaction, Category, Subcategory
import datetime

def index(request):
    transactions = Transaction.objects.order_by('-date')
    category = Category.objects.all()
    subcategory = Subcategory.objects.all()
    year_range = Transaction.year_range()

    context = {'transactions': transactions,
               'category': category,
               'subcategory': subcategory,
               'year_range': year_range,
               }

    return render(request, 'transactions/dashboard.html', context)


def search_transactions(request):
    print "**********"
    print request.body
    print "**********"
    transactions = Transaction.objects.filter(category__number='5010').order_by('-date')
    enableCategory = request.POST.get('enableCategory')
    enableSubcategory = request.POST.get('enableSubcategory')
    if enableCategory and enableSubcategory:
        categorySelect = request.POST.get('categorySelect')
        subcategorySelect = request.POST.get('subcategorySelect')
        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')
        transactions = Transaction.objects.filter(category__name=categorySelect).filter(subcategory__name=subcategorySelect).filter(date__range=[fromDate, toDate]).order_by('-date')
    
    elif enableCategory:
        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')
        categorySelect = request.POST.get('categorySelect')
        transactions = Transaction.objects.filter(category__name=categorySelect).filter(date__range=[fromDate, toDate]).order_by('-date')
    
    else:
        fromDate = request.POST.get('fromDate')
        toDate = request.POST.get('toDate')
        transactions = Transaction.objects.filter(date__range=[fromDate, toDate]).order_by('-date')

    year_range = Transaction.year_range()
    category = Category.objects.all()
    subcategory = Subcategory.objects.all()
    context = {'transactions': transactions,
               'category': category,
               'subcategory': subcategory,
               'year_range': year_range,
               }

    return render(request, 'transactions/dashboard.html', context)
