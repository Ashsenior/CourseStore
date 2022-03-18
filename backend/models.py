from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class University(models.Model):
    address = models.CharField(max_length=500)
    name = models.CharField(max_length=200, unique=True)
    logo = models.FileField(upload_to="logo/")

class Member(AbstractUser):
    university = models.ForeignKey(University, on_delete=models.CASCADE)

class Project(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(max_length=2000)
    mentor = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    resource = models.CharField(max_length=200)
    members = models.ManyToManyField(Member,related_name="projects")

class Image(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/")
    