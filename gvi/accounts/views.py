
from django.shortcuts import render, get_object_or_404
from django.http import Http404, JsonResponse, HttpResponseForbidden, HttpResponseServerError, HttpResponseNotAllowed
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
def account_new_get(request):
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
                print "Key Error account_new_get POST"
                print e
                return HttpResponseServerError
            except Exception as e:
                print "Turbo Exception account_new_get GET"
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
                                'number': account.number,
                                }

            except KeyError as e:
                print "Key Error account_new_get GET"
                print e
                return HttpResponseServerError
            except Account.DoesNotExist as e:
                print "Does Not Exist account_new_get GET"
                print e
                return Http404

            return JsonResponse(json_account)

        # The rest of the methods are not supported
        else:
            return HttpResponseNotAllowed
    else:
        return HttpResponseForbidden

@csrf_exempt
def account_update_delete(request):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                account_id = request.POST['id']
                a_type = request.POST['account_type']
                b = request.POST['balance']
                curr = request.POST['currency']
                currency = Currency.objects.filter(name=curr)
                account = Account.objects.get(pk=account_id)
                account.account_type = a_type
                account.balance = b
                account.currency = currency[0]
                if a_type == 'b':
                    bank = request.POST['bank_name']
                    number = request.POST['number']

                    account.bank_name = bank
                    account.number = number

                account.save()

                return JsonResponse({'code': '200',
                                     'msg': 'all cool',
                                     'pk': account.pk},
                                    )

            except KeyError, e:
                print "KeyError account_update_delete POST"
                print type(e)
                print e.args
                return HttpResponseServerError
            except Exception as e:
                print "Turbo Exception account_update_delete POST"
                print type(e)
                print e.args
                return HttpResponseServerError
        elif request.method == 'GET':
            try:
                account_id = request.GET['id']
                account = Account.objects.get(pk=account_id)
                account.delete()

                return JsonResponse({'code': '200',
                                     'msg': 'account deleted',
                                     'pk': account_id},
                                    )
            except KeyError as e:
                print "Key Error account_update_delete GET"
                print e
                return HttpResponseServerError
            except Exception as e:
                print "Turbo Exception account_update_delete GET"
                print e
                return HttpResponseServerError
        else:
            return HttpResponseNotAllowed
    else:
        return HttpResponseNotAllowed

@csrf_exempt
def money_transfer(request):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                source_id = request.POST['source_id']
                target_id = request.POST['target_id']
                amount = request.POST['amount']
                s_account = Account.objects.get(pk=source_id)
                t_account = Account.objects.get(pk=target_id)
                s_account.balance = s_account.balance - amount
                t_account.balance = t_account + amount
                s_account.save()
                t_account.save()

                return JsonResponse({'code': '200',
                                     'msg': 'transaction completed',
                                     })

            except (KeyError, Exception) as e:
                print "Key Error/ Exception money_transfer"
                print type(e)
                return HttpResponseServerError

        else:
            return HttpResponseNotAllowed
    else:
        return HttpResponseForbidden
