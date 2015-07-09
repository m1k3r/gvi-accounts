from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^hub/search/$', views.hub_search, name='hub_search'),
    url(r'^hub/$', views.add_get_hub, name='hub'),
    url(r'^hub/(?P<pk>\d+)/$', views.hub_detail, name='hub_detail'),
    url(r'^change_hub/$', views.hub_update_delete, name='hub_update_delete'),
]
