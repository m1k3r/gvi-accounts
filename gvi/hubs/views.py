from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseForbidden, JsonResponse, HttpResponseServerError
from django.http import HttpResponse

from .models import Hubs


def index(request):
    hubs = Hubs.objects.all()
    context = {'hubs': hubs}
    return render(request, 'hubs/dashboard.html', context)


@csrf_exempt
def add_get_hub(request):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                name = request.POST['name']
                manager = request.POST['manager']
                country = request.POST['country']
                hub = Hubs(name=name, manager=manager, country=country)
                hub.save()
            except (KeyError, Exception) as e:
                print "KeyError / Exception in POST add_delete_hub"
                print e.args
                return HttpResponseServerError(request)

            return JsonResponse({'code': '200',
                                 'msg': 'all ok',
                                 })
        else:
            try:
                hub_id = request.GET['id']
                hub = get_object_or_404(Hubs, pk=hub_id)
                json_hub = {'id': hub.pk,
                            'name': hub.name,
                            'manager': hub.manager,
                            'country': hub.country,
                            }

            except KeyError as e:
                print e.args
                print "GET add_delete_hub"
                return HttpResponseServerError(request)

            return JsonResponse(json_hub)

    else:
        return HttpResponseForbidden(request)


@csrf_exempt
def hub_update_delete(request):
    if request.is_ajax():
        if request.method == 'POST':
            try:
                print "*******"
                print request.body
                print "*******"
                hub_id = request.POST['id']
                name = request.POST['name']
                country = request.POST['country']
                manager = request.POST['manager']
                hub = get_object_or_404(Hubs, pk=hub_id)
                hub.manager = manager
                hub.country = country
                hub.name = name
                hub.save()
            except KeyError as e:
                print e
                print "KeyError POST hub_update POST"
                return HttpResponseServerError(request)

            return JsonResponse({'code': '200',
                                 'msg': 'hub updated',
                                 'id': hub_id,
                                 })

        else:
            try:
                hub_id = request.GET['id']
                hub = get_object_or_404(Hubs, pk=hub_id)
                hub.delete()
            except KeyError as e:
                print e
                print "KeyError hub_update_delete GET"
                return HttpResponseServerError(request)

            return JsonResponse({'code': '200',
                                 'msg': 'hub deleted',
                                 'id': hub_id,
                                 })
    else:
        return HttpResponseForbidden(request)


def hub_search(request):

    if request.method == 'POST':
        option = request.POST['option']
        search_text = request.POST['search_txt']
        if option == 'hub':
            try:
                hub = Hubs.objects.filter(name=search_text)
                context = {'hub': hub}
            except Hubs.DoesNotExist as e:
                print "Hubs.DoesNotExist at hub_search POST" + e.args
                # context = {'error': 'Hub not found'}
                return HttpResponse("Hub not found")

            return HttpResponse(hub.name)

        if option == 'manager':
            try:
                hub = Hubs.objects.filter(manager=search_text)
                context = {'hub': hub}
            except Hubs.DoesNotExist as e:
                print "Hubs.DoesNotExist at hub_search POST" + e.args
                # context = {'error': 'Hub not found'}
                return HttpResponse("Hub not found")

            return HttpResponse(hub.manager)
    else:
        return HttpResponseForbidden(request)


def hub_detail(request, pk):
    hub = get_object_or_404(Hubs, pk)
    context = {'hub': hub}
    return render(request, 'hubs/detail.html', context)
