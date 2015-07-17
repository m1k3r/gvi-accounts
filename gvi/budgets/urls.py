from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^variable/$', views.variable, name='variable'),
    url(r'^create_budget/$', views.create_budget, name='create_budget'),

]
