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

# Create your views here.

class AddUniversityView(APIView):
    serializer_class = UniversitySerializer
    def get(self,request,format=None):
        queryset = University.objects.all()
        if len(queryset)>0:
            data = UniversitySerializer(queryset, many=True).data
            return Response(data,status=status.HTTP_200_OK)

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"created"},status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response({"message":"something went wrong !"},status=status.HTTP_400_BAD_REQUEST)

class AddMemberView(APIView):
    serializer_class = MemberSerializer
    def post(self,request,fromat=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"created"},status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response({"message":"something went wrong!"},status=status.HTTP_400_BAD_REQUEST)

class GetUniversityView(APIView):
    serializer_class = UniversitySerializer
    serializer_class_2 = ProjectSerializer
    lookup_url_kwarg = 'id'
    def get(self,request,format=None):
        u_id = request.GET.get(self.lookup_url_kwarg)
        if u_id:
            queryset = University.objects.filter(id=u_id)
            if len(queryset)>0:
                projects = Project.objects.filter(university=queryset[0])
                projects = self.serializer_class_2(projects, many=True).data
                university = UniversitySerializer(queryset[0]).data
                return Response({"university":university,"projects":projects},status=status.HTTP_200_OK)


