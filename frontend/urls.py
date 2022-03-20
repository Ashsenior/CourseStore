from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = "frontend"

urlpatterns = [
    path('',index),
    path('university-form/',index),
    path('member-form/',index),
    path('universities/',index),
    path('university/<str:id>',index),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)