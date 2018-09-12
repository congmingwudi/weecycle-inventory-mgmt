# syntax: ./git-push-master.sh "your push comment"

# push comment
if [ -n "$1" ] 
then 
    COMMENT=$1
else 
    COMMENT="project update"
fi
echo pushing project to git with comment: $COMMENT

# push to git
git add -A
git commit -m "$COMMENT"
git push origin master