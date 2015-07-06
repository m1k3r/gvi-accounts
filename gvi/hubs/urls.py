from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^hub/$', views.add_delete_hub, name='hub'),
    url(r'^hub/(?P<pk>\d+)/$', views.hub_detail, name='hub_detail'),
]
