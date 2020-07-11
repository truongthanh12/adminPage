
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from knox.models import AuthToken
import hashlib
import numpy as np
import math
from django.shortcuts import get_object_or_404

import os
from blogs.models import Blog, Category, Poster
from blogs.serializers import BlogSerializer, CategorySerializer, PosterSerializer
from contact.models import Contact
from contact.serializers import ContactSerializer
from accounts.models import User
from accounts.serializers import UserSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer

# ################################################ blog api ##################################################
from rest_framework.parsers import MultiPartParser, FormParser


@api_view(['GET', "POST", ])
def blog_list(request):
    """
    List all code contacts, or delete a  contact.
    """

    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                blogs = np.array(Blog.objects.all())

                current_page = int(request.GET.get('page') or 1)
                limit_page = int(request.GET.get('limit') or 4)

                total_page = math.ceil(Blog.objects.all().count()/limit_page)

                current_blogs = blogs[current_page-1:current_page*limit_page]
                serializer = BlogSerializer(current_blogs, many=True)
                return Response({'data': serializer.data,
                                 'pagination': {
                                     'total': total_page,
                                     'page': current_page,
                                     'limit': limit_page
                                 }
                                 })
            except expression as identifier:
                return Response({'msg': identifier}, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'POST':
            serializer = BlogSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                filename = "blog"+str(serializer.data['id'])+".html"
                f = open("templates/pages/blog/"+filename, 'w+')
                f.write(serializer.data['content'])
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'msg': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def blog_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """

    if request.user.is_authenticated:
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            serializer = BlogSerializer(blog)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = BlogSerializer(blog, data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            # blog.delete()
            filename = "blog"+str(pk)+".html"
            os.remove("templates/pages/blog/"+filename)
            return Response({'message': 'Blog were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', "PUT", "DELETE"])
def getPoster(request, blogId):
    if request.user.is_authenticated:
        try:
            poster = Poster.objects.get(blog=blogId)
        except Poster.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            serializer = PosterSerializer(poster)
            return Response(serializer.data)

        elif request.method == 'PUT':  # coding
            serializer = PosterSerializer(poster, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':  # coding

            return Response({'message': 'Blog were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', "POST"])
def getPosters(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            posters = Poster.objects.all()
            serializer = PosterSerializer(posters, many=True)
            return Response(serializer.data)
        if request.method == 'POST':
            return 0  # coding
            # serializer = PosterSerializer(, many=True)
            # return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', "POST", ])
def category_list(request):
    """
    List all code contacts, or delete a  contact.
    """
    if request.user.is_authenticated:
        if request.method == 'GET':
            category = Category.objects.all()
            serializer = CategorySerializer(category, many=True)
            return Response(serializer.data)
        elif request.method == 'POST':
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                filename = "blog"+str(serializer.data['id'])+".html"
                f = open("templates/pages/blog/"+filename, 'w+')
                f.write(serializer.data['content'])
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    if request.user.is_authenticated:
        try:
            category = Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method == 'GET':
            serializer = CategorySerializer(blog)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = CategorySerializer(category, data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            category.delete()
            return Response({'message': 'category were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)

##################################################### contact api #####################################################################
@api_view(['GET'])
def contact_list(request):
    """
    List all code contacts, or delete a  contact.
    """
    if request.user.is_authenticated:
        if request.method == 'GET':
            contacts = Contact.objects.all()
            serializer = ContactSerializer(contacts, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'DELETE'])
def detail_contact(request, id):
    """
    Retrieve, update or delete a code snippet.
    """
    if request.user.is_authenticated:
        try:
            contact = Contact.objects.get(pk=id)
        except Contact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = ContactSerializer(contact)
            return Response(serializer.data)

        elif request.method == 'DELETE':
            contact.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)

# ############################################### user api #########################################################################


class Login(generics.GenericAPIView):

    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid() == False:
            return Response({
                'msg': 'username or password incorrect'
            })
        user = serializer.validated_data
        print(user)
        if user:
            return Response({
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
                'token': AuthToken.objects.create(user)[1]
            })
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Register(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return Response({
                    'user': UserSerializer(user, context=self.get_serializer_context()).data,
                    'token': AuthToken.objects.create(user)[1]
                })
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def get_users(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.user.is_authenticated:

        if request.method == 'GET':

            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def GetMe(request):
    if request.user.is_authenticated:
        if request.method == 'GET':
            user = get_object_or_404(User, pk=request.user.id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def user_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    if request.user.is_authenticated:

        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data)
        if request.method == 'PUT':
            serializer = UserSerializer(user, data=request.data)
            return Response(serializer.data)
        elif request.method == 'DELETE':
            user.delete()
            return Response({'mgs': "success"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'msg': "login required"}, status=status.HTTP_403_FORBIDDEN)
