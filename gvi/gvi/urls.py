"""gvi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^reports/', include('reports.urls', namespace='reports', app_name='reports')),
    url(r'^budgets/', include('budgets.urls', namespace='budgets', app_name='budgets')),
    url(r'^accounts/', include('accounts.urls', namespace='accounts', app_name='accounts')),
    url(r'^transactions/', include('transactions.urls', namespace='transactions', app_name='transactions')),
    url(r'^hubs/', include('hubs.urls', namespace='hubs', app_name='hubs')),
    url(r'^admin/', include(admin.site.urls)),
]
