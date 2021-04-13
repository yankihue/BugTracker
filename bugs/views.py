from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Bug, Comment
from rest_framework import viewsets
from .serializers import BugSerializer, CommentSerializer


class BugView(viewsets.ModelViewSet):
    serializer_class = BugSerializer
    queryset = Bug.objects.all()


class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


def index(request):
    latest_bugs_list = Bug.objects.order_by('-pub_date')[:5]
    context = {'latest_bugs_list': latest_bugs_list}
    return render(request, 'bugs/index.html', context)


def detail(request, bug_id):
    bug = get_object_or_404(Bug, pk=bug_id)
    return render(request, 'bugs/detail.html', {'bug': bug})


def respond(request, bug_id):
    return HttpResponse('You are commenting on bug %s' % bug_id)
