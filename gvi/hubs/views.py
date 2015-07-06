from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from .models import Hubs

def index(request):
    hubs = Hubs.objects.all()
    context = {'hubs': hubs}
    return render(request, 'hubs/dashboard.html', context)

@csrf_exempt
def add_delete_hub(request):
    pass

def hub_detail(request, pk):
    hub = get_object_or_404(Hubs, pk)
    context = {'hub': hub}
    return render(request, 'hubs/detail.html', context)
