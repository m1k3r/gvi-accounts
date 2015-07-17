from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search_transactions/$', views.search_transactions, name='search_transactions'),
    url(r'^transaction/account/(?P<pk>\d+)/$', views.balance_detail, name='balance_detail'),
    url(r'^transaction/account/(?P<pk>\d+)/new_transaction/$', views.new_transaction, name='new_transaction'),
    url(r'^transaction/account/(?P<pk>\d+)/change_transaction/$', views.update_delete_transaction,
        name='change_transaction'),
    url(r'^cats_subs/$', views.cats_subs, name='cats_subs'),
    url(r'^new_subcategory/$', views.new_del_sub, name='change_sub'),
    url(r'^subcategories/$', views.subcategories, name='subcategories'),
]
