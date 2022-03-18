from django.http.response import JsonResponse
from .serializers import *
from .models import *
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from os import path
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.

class AddUniversityView(APIView):
    serializer_class = UniversitySerializer
    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"created"},status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response({"message":"something went wrong !"},status=status.HTTP_400_BAD_REQUEST)