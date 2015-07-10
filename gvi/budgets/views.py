from django.shortcuts import render

from django.http import HttpResponse

from .models import BudgetElement, Budget
from accounts.models import Currency
from transactions.models import Category

def index(request):
    category = Category.objects.all()
    currency = Currency.objects.all() 
    
    context = {'transactions': category,
            'currency':currency,
            }
    return render(request, 'budgets/dashboard.html')
