
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseForbidden
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from .models import Account, Currency


def index(request):
    bank_acc = Account.objects.filter(account_type='b')
    cash_acc = Account.objects.filter(account_type='c')
    curr = Currency.objects.all()
    context = {'bank_acc': bank_acc,
               'cash_acc': cash_acc,
               'curr': curr,
               }
    # return HttpResponse("Welcome to Accounts Dashboard")
    return render(request, 'accounts/dashboard.html', context)


@csrf_exempt
def account_api(request):
    if request.is_ajax():
        # POST method for creating a new object
        if request.method == 'POST':

            a_type = request.POST['account_type']
            b = request.POST['balance']
            curr = request.POST['currency']
            currency = Currency.objects.filter(name=curr)
            print currency

            new_acc = Account(account_type=a_type, balance=b, currency=currency[0])
            new_acc.save()

            return JsonResponse({'code': '200',
                                 'msg': 'all cool',
                                 'pk': new_acc.pk},
                                )
        # GET method for retrieving and object
        elif request.method == 'GET':
            pass

        elif request.method == 'UPDATE':
            pass

        elif request.method == 'DELETE':
            pass

        else:
            return HttpResponseForbidden
    else:
        return HttpResponseForbidden
