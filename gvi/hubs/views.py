from django.shortcuts import render
from django.http import HttpResponse
from .models import Hubs

def index(request):
    hubs = Hubs.objects.all()
    context = {'hubs': hubs}
    return render(request, 'hubs/dashboard.html', context)