
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^reports/', include('reports.urls', namespace='reports', app_name='reports')),
    url(r'^budgets/', include('budgets.urls', namespace='budgets', app_name='budgets')),
    url(r'^accounts/', include('accounts.urls', namespace='accounts', app_name='accounts')),
    url(r'^transactions/', include('transactions.urls', namespace='transactions', app_name='transactions')),
    url(r'^hubs/', include('hubs.urls', namespace='hubs', app_name='hubs')),
    url(r'^users/', include('users_m.urls', namespace='users_m', app_name='users_m')),
    url(r'^admin/', include(admin.site.urls)),
]
