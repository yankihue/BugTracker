from rest_framework import serializers
from .models import Bug, Comment


class BugSerializer(serializers.ModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)


    class Meta:
        model = Bug
        fields = ('id', 'bug_title', 'pub_date', 'bug_text', 'active', 'comments')


class CommentSerializer(serializers.ModelSerializer):


    class Meta:
        model = Comment
        fields = ('id', 'comment_author',
                  'comment_date', 'comment_text', 'bug')
