
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
def new_account(request):
    if request.is_ajax():
        # for obj in serializers.deserialize("json", request.body):
        #    print obj
        print "***********"
        print request.body
        print "***********"
        a_type = request.POST['account_type']
        b = request.POST['balance']
        curr = request.POST['currency']
        currency = Currency.objects.filter(name=curr)
        print currency

        new_acc = Account(account_type=a_type, balance=b, currency=currency[0])
        new_acc.save()

        return JsonResponse({'code': '200'})
    else:
        return HttpResponseForbidden
