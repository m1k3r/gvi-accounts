from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search_transactions/$', views.search_transactions, name='search_transactions'),
]
