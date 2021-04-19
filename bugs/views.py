from django.shortcuts import render, get_object_or_404
from .models import Bug, Comment
from rest_framework import viewsets
from .serializers import BugSerializer, CommentSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


class BugView(viewsets.ModelViewSet):
    serializer_class = BugSerializer
    queryset = Bug.objects.all()


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

