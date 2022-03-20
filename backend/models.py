from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

def upload_to(instance, filename):
    return 'logo/{filename}'.format(filename=filename)
def upload_to_images(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class University(models.Model):
    city = models.CharField(max_length=500)
    name = models.CharField(max_length=200, unique=True)
    brief = models.TextField(max_length=3000)
    logo = models.ImageField(upload_to=upload_to)
    website = models.CharField(max_length=250,default="none")
    email = models.EmailField(null=False,default="default@gmail.com")
    verified = models.BooleanField(default=False)

    def __str__(self): 
        return self.name


class Member(AbstractUser):
    university = models.ForeignKey(University, on_delete=models.CASCADE,null=True)
    designation = models.CharField(max_length=100,default="Viewer")

    def __str__(self): 
        return f"{self.username} & {self.designation}"


class Project(models.Model):
    name = models.CharField(max_length=200, unique=True)
    brief = models.TextField(max_length=2000)
    university = models.ForeignKey(University, on_delete=models.CASCADE,null=True)
    mentor = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True)
    resource = models.CharField(max_length=200)
    members = models.ManyToManyField(Member,related_name="projects")
    verified = models.BooleanField(default=False)

    def __str__(self): 
        return self.name


class Image(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_to_images)

    def __str__(self): 
        return self.project.name

    