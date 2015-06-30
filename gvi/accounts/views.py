
from django.shortcuts import render
from django.http import Http404, JsonResponse, HttpResponseForbidden, HttpResponseServerError
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

            try:
                a_type = request.POST['account_type']
                b = request.POST['balance']
                curr = request.POST['currency']
                currency = Currency.objects.filter(name=curr)
                if a_type == 'b':
                    bank = request.POST['bank_name']
                    number = request.POST['number']
                    new_acc = Account(account_type=a_type, balance=b, currency=currency[0],
                                      bank_name=bank, number=number)
                else:
                    new_acc = Account(account_type=a_type, balance=b, currency=currency[0])

            except KeyError, e:
                print e
                return HttpResponseServerError
            except Exception as e:
                print e
                return HttpResponseServerError

            new_acc.save()

            return JsonResponse({'code': '200',
                                 'msg': 'all cool',
                                 'pk': new_acc.pk},
                                )

        # GET method for retrieving an object
        elif request.method == 'GET':
            try:
                account_id = request.GET['id']
                print account_id
                account = Account.objects.get(pk=account_id)
                currency = Currency.objects.get(pk=account.currency.pk)
                json_account = {'id': account.pk,
                               'type': account.account_type,
                               'bank': account.bank_name,
                               'balance': account.balance,
                               'currency': currency.name,
                               }

            except KeyError as e:
                print e
                return HttpResponseServerError
            except Account.DoesNotExist as e:
                print e
                return Http404

            return JsonResponse(json_account)

        # UPDATE method for updating an object
        elif request.method == 'UPDATE':
            pass
        # DELETE method for deleting an object
        elif request.method == 'DELETE':
            pass
        # The rest of the methods are not supported
        else:
            return HttpResponseForbidden
    else:
        return HttpResponseForbidden
