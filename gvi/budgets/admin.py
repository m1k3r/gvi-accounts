from django.contrib import admin

from .models import Budget, BudgetElement

admin.site.register(Budget)
admin.site.register(BudgetElement)

