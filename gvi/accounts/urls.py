from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create_account/$', views.account_new_get, name='new_account'),
    url(r'^change_account/$', views.account_update_delete, name='update_account'),
    url(r'^money_transfer/$', views.money_transfer, name='money_transfer'),
    url(r'^currencies/$', views.currency_dash, name='currencies'),
]
