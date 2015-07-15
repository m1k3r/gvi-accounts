from django.shortcuts import render

from django.http import HttpResponse

from .models import BudgetElement, Budget
from accounts.models import Currency
from transactions.models import Category
from .forms import BudgetForm


def index(request):
    category = Category.objects.all()
    currency = Currency.objects.all() 
    
    context = {'category': category,
            'currency':currency,
            }
    
    return render(request, 'budgets/dashboard.html', context)


def create_budget(request):
    BudgetFormSet = formset_factory(BudgetForm)

    if request.method == 'POST':
        budget_formset = BudgetFormSet(request.POST)
        
        if budget_form.is_valid():
            new_budget = []
            
            for budget_form in budget_formset:
                category = budget_form.cleaned_data.get('category')
                amount = budget_form.cleaned_data.get('amount')
                currency = budget_form.cleaned_data.get('currency')

                """
                if anchor and url:
                    new_budget.append(BudgetElement(category=category, amount=amount, currency=currency))
                """
                print "**********"
                print category
                print amount
                print currency
                print "**********"

    return render(request, 'budgets/dashboard.html', context)
