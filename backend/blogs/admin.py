from django.contrib import admin
from .models import Blog, Category, Poster

# Register your models here.


class PosterAdmin(admin.ModelAdmin):
    pass


class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'created_at')
    list_display_links = ('id', 'title')
    list_per_page = 25


admin.site.register(Blog, BlogAdmin)
admin.site.register(Category)
admin.site.register(Poster)
