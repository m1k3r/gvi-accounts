from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^user_login/$', views.app_login, name='user_login'),
    url(r'^user_logout/$', views.app_logout, name='user_logout'),
]

