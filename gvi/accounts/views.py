
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.core import serializers

from .models import Account


def index(request):
    bank_acc = Account.objects.filter(account_type='b')
    cash_acc = Account.objects.filter(account_type='c')
    context = {'bank_acc': bank_acc,
               'cash_acc': cash_acc,
               }
    # return HttpResponse("Welcome to Accounts Dashboard")
    return render(request, 'accounts/dashboard.html', context)


def new_account(request):
    if request.is_ajax:
        for obj in serializers.deserialize("json", request.body):
            print obj

        return JsonResponse({'code': '200'})
    else:
        return HttpResponseBadRequest()
