from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseForbidden
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from django.http import HttpResponse
from .models import Transaction, Category, Subcategory


def index(request):
    transactions = Transaction.objects.order_by('date')
    category = Category.objects.all()
    subcategory = Subcategory.objects.all()

    context = {'transactions': transactions,
               'category': category,
               'subcategory': subcategory,
               }

    return render(request, 'transactions/dashboard.html', context)

def search_transactions(request):
    transactions = Transaction.objects.filter(category_number='5020')
    category = Category.objects.all()
    subcategory = Subcategory.objects.all()

    context = {'transactions':transactions,
               'category':category,
               'subcategory':subcategory,
               }

    return render(request, 'transactions/dashboard.html', context)



