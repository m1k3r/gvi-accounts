from django.shortcuts import render
from django.http import HttpResponse
from django.forms.formsets import formset_factory

from .models import BudgetElement, Budget
from accounts.models import Currency
from transactions.models import Category
from hubs.models import Hubs

import hashlib
import time
import datetime


#{{{Index
def index(request):
    category = Category.objects.all()
    currency = Currency.objects.all() 
    
    context = {'category': category,
            'currency':currency,
            }
    
    return render(request, 'budgets/dashboard.html', context)
#}}} 


#{{{Create Budget
def create_budget(request):

    print "******* FOR ***"
    print request.body
    AMOUNT = 0
    CATEGORY = 1
    CURRENCY = 2

    form_elements = []
    counter = 0
    
    hash = hashlib.sha1()
    hash.update(str(datetime.datetime.now()))
    BUDGET_NUMBER = hash.hexdigest()

    hub = Hubs.objects.all()[0]
    
    new_budget = Budget(number=BUDGET_NUMBER,
                        initial_date=request.POST['newBudgetFromDate'],
                        final_date=request.POST['newBudgetToDate'],
                        hub=hub)
    
    new_budget.save()

    for key in request.POST:
        if "form" in key:
            form_elements.append(key)
            print key + ':' + request.POST[key]
    
    print len(form_elements)
    
    sort_form_elements = sorted(form_elements)
     
    while counter < len(form_elements):
        print sort_form_elements[counter]
        category = Category.objects.filter(name=request.POST[sort_form_elements[counter+CATEGORY]])[0]
        currency = Currency.objects.filter(contraction=request.POST[sort_form_elements[counter+CURRENCY]])[0]
        new_budget_element = BudgetElement(amount=request.POST[sort_form_elements[counter+AMOUNT]],
                                           category=category,
                                           currency=currency,
                                           number=new_budget,
                                           budget_type='f')
        new_budget_element.save()
        counter += 3
    

    print "******* END ***"
   


    category = Category.objects.all()
    currency = Currency.objects.all()

    context = {'category': category,
            'currency':currency,
            }   

    return render(request, 'budgets/dashboard.html', context)
#}}}


#{{{Variable
def variable(request):
    category = Category.objects.all()
    currency = Currency.objects.all()

    context = {'category': category,
            'currency':currency,
            }
    
    return render(request, 'budgets/variable.html', context)
#}}}
