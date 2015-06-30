from django.contrib import admin

from .models import Transaction, Category, Subcategory

admin.site.register(Transaction)
admin.site.register(Category)
admin.site.register(Subcategory)
