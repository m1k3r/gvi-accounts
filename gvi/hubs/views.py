from django.shortcuts import render
from django.http import HttpResponse
from .models import Hubs

def index(request):
    hubs = Hubs.objects.all()
    context = {'hubs': hubs}
    return render(request, 'hubs/dashboard.html', context)

def add_delete_hub(request):
    pass

def hub_detail(request, pk):
    response = "You are at: " + pk
    return HttpResponse(response)

