from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views
from .views import *
from .views import Login, Register
urlpatterns = [
    path('api/blogs', blog_list),
    path('api/blogs/<int:pk>', blog_detail),

    path('api/cates', category_list),
    path('api/cates/<int:pk>', category_detail),
    path('api/posters/', getPosters),
    path('api/posters/<int:blogId>', getPoster),

    path('api/auth/getMe', GetMe),
    path('api/users', get_users),
    path('api/users/<int:pk>', user_detail),
    path('api/auth/login', Login.as_view()),
    path('api/auth/register', Register.as_view()),
    path('api/auth/changePassword', ChangePasswordView.as_view()),

    path('api/contacts/', contact_list),
    path('api/contacts/<int:id>/', detail_contact),
]
