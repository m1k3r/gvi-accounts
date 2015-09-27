from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^variable/$', views.variable, name='variable'),
    url(r'^create_budget/$', views.create_budget, name='create_budget'),
    url(r'^create_budget_variable/$', views.create_budget_variable, name='create_budget_variable'),
    url(r'^search_budget/$', views.search_budget, name='search_budget'),
    url(r'^variable/search_budget_variable/$', views.search_budget_variable, name='search_budget_variable'),
]
