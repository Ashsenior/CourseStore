from django.urls import path
from .views import AddUniversityView, AddMemberView
from django.conf import settings
from django.conf.urls.static import static

# Write all your urls here 

urlpatterns = [
    path("add-university/",AddUniversityView.as_view()),
    path("add-member/",AddMemberView.as_view()),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)