from django.shortcuts import render
from django.http import HttpResponse
from django.forms.formsets import formset_factory

from .models import BudgetElement, Budget
from accounts.models import Currency, Account
from transactions.models import Transaction, Category, Subcategory
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

#{{{Variable
def variable(request):
    category = Category.objects.all()
    currency = Currency.objects.all()

    context = {'category': category,
            'currency':currency,
            }

    return render(request, 'budgets/variable.html', context)
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

#{{{Create_budget_variable
def create_budget_variable(request):

    print "******* FOR ***"
    print request.body
    AMOUNT = 0
    CATEGORY = 1
    CURRENCY = 2
    VARIABLE_TYPE = 3

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
        #flag_type = request.POST.get(sort_form_elements[counter+VARIABLE_TYPE])
        try:
            if "type" in sort_form_elements[counter+VARIABLE_TYPE]:
                print "estoy en verdad"
                variable_type = 'f'
                variable_off = 4
            else:
                print "estoy en no"
                variable_type = 'o'
                variable_off = 3
        except:
            variable_off = 3
            variable_type = 'o'

        new_budget_element = BudgetElement(amount=request.POST[sort_form_elements[counter+AMOUNT]],
                                           category=category,
                                           currency=currency,
                                           number=new_budget,
                                           budget_type='v',
                                           variable_type=variable_type)
        new_budget_element.save()
        
        counter += variable_off
            

    print "******* END ***"
   


    category = Category.objects.all()
    currency = Currency.objects.all()

    context = {'category': category,
            'currency':currency,
            }

    return render(request, 'budgets/variable.html', context)
#}}}

#{{{Search_budget
def search_budget(request):
    
    total_category = {}
    total_subcategory = {}

    category = Category.objects.all()
    hub = Hubs.objects.all()[0]
    transactions = Transaction.objects.filter(account__owner__name=hub.name)
    transactions = transactions.filter(date__range=[fromDate, toDate])
    accounts = Account.objects.filter(owner=hub)
    currency = Currency.objects.filter(account=accounts)
    category = Category.objects.filter(transaction=transactions)
    subcategory = Subcategory.objects.filter(transaction=transactions)


    for i in currency:
        transactions_curr = transactions.filter(account__currency__contraction=i.contraction)
        for x in category:
            transactions_curr_cat = transactions_curr.filter(category=x)
            sub_cat = subcategory.filter(category__name=x.name)
            for y in sub_cat:
                transactions_curr_cat_sub = transactions_curr_cat.filter(subcategory=x)
                for z in transactions_curr_cat_sub: 
                    total_category[i.contracction+x.name] += z.amount
                    total_subcategory[i.contraction+y.name] += z.amount


    print total_category
    print total_subcategory
    context = {'category': category,
            'currency':currency,
            }

    return render(request, 'budgets/dashboard.html', context)
#}}}

#{{{Search_budget_variable 
def search_budget_variable(request):
    print "**********"
    print request.body
    print "**********"

    total_category = 0
    total_subcategory = 0
    search_json = {}
    category_jason = {}
    sub_jason = {}
    fromDate = request.POST.get('fromDate')
    toDate = request.POST.get('toDate')
    
    category = Category.objects.all()
    hub = Hubs.objects.all()[0]
    transactions = Transaction.objects.filter(account__owner__name=hub.name)
    transactions = transactions.filter(date__range=[fromDate, toDate])
    accounts = Account.objects.filter(owner=hub)
    currency = Currency.objects.filter(account=accounts)
    category_transaction = Category.objects.filter(transaction=transactions)
    subcategory = Subcategory.objects.filter(transaction=transactions)


    for i in currency:
        transactions_curr = transactions.filter(account__currency__contraction=i.contraction)  
        
        for x in category_transaction:
            transactions_curr_cat = transactions_curr.filter(category=x)
            sub_cat = subcategory.filter(category__name=x.name)
            sub_jason["total"] = 0
            for y in sub_cat:
                transactions_curr_cat_sub = transactions_curr_cat.filter(subcategory=y)
                 
                for z in transactions_curr_cat_sub: 
                    
                    try:
                        sub_jason[y.name] += z.amount
                        sub_jason["total"] += z.amount
                        #total_category[i.contraction+x.name] += z.amount
                        #total_subcategory[i.contraction+y.name] += z.amount
                    
                    except:
                        sub_jason[y.name] = z.amount
                        sub_jason["total"] += z.amount
                        #total_subcategory[i.contraction+y.name] = z.amount
                        #total_category[i.contraction+x.name] = z.amount
                
                category_jason[x.name] = sub_jason
            search_json[i.name] = category_jason

    
    print search_json
    print category
    print category_transaction
    print total_category
    print total_subcategory
 
    context = {'category': category,
            'category_transaction':category_transaction,
            'currency':currency,
            'subcategory':subcategory,
            'total_category':total_category,
            'total_subcategory':total_subcategory,
            }

    return render(request, 'budgets/dashboard.html', context)
#}}}

