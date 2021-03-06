+++
template = "post"
title = "Git Cheat Sheet"
tags = ["Dev", "Cheat Sheet", "Dev Notes", "git"]
date = "2012-12-17"
url = "git cheat sheet"
type = "post"
img = "/img/unsplash/tumblr_n6et0idQ131st5lhmo1_1280.jpg"
+++
<pre><code class='language-markup'>
#Setting up git from scratch
git init                                             #initialize git 
git remote add < remote_label > < destination >      #adds a new remote destination with a label
git fetch < remote_label >                           #fetches the head of the repo
git checkout master                                  #checkouts the master branch

#Setting up git from another repo
git clone < remote_label >  < optional_dir_location >  #clone a repo with git config ready 

#Branching
git branch                                     #list all branches
git branch < branch_label >                    #creates a new local branch with name < branch_label >
git branch -d < branch_label >                 #deletes the local branch with name < branch_label >
git push < remote_label> :< branch_label >     #deletes remote branch

#Merging
git checkout < branch to be merge >           
git merge < branch_name >                      #merge recursively and auto commit

additional info - <a href="http://www.kernel.org/pub/software/scm/git/docs/git-merge.html" title="git merge">git merge man page</a>

#fetch & pulling
git pull < remote_label > < branch_label>      #it will recursively merge with your repo
git fetch < remote_label >

#Commit
git commit -a -m < message >                   #local commit
git commit -amend -m < message >               #edit last commit message
git push < remote_label > < branch_label >     #commits to remote branch

#Tagging
git tag -a < comment >                         #to remember a specific point
git push --tag                                 #pushes tag

#To delete a tag
git tag -d < tag_name >
git push origin :< tag_name >

#if tag name is same as one of your branch name
git tag -d < tag_name >
git push origin :refs/tag/< tag_name >

#Logging
git log                                        #shows the commit log

#Untrack a file
git rm --cache < file_name >                   #untracks a file, thus not included in repo

#Stashing
git stash

#cloning a bare repo for deployment purpose
git clone --bare
</code></pre>
<p>additional info <a href='http://www.kernel.org/pub/software/scm/git/docs/git-stash.html' title='git stash man page'>git stash man page</a></p>
<pre><code class='language-markup'>
#reverting to previous commits  [Advance]
git checkout < commit_hash >                     #checkout the indicated commit hash
git checkout -b < branch_label > < commit_hash>  #branches with < branch_label > and checkout to the commit hash
git reset --hard < commit_hash >                 #destroys the local modification, you will loose the uncommit work
git revert < commit_hash >                       #reverts to the previous commit

</code></pre>
<p>additional info - <a href="http://schacon.github.com/git/git-revert.html" title="git revert man page">git revert man page</a> & <a href="http://stackoverflow.com/questions/4114095/git-revert-to-previous-commit-how" title="stack over flow git revert qa">stack over flow git revert qa</a></p>
<pre><code class='language-markup'>
#splitting a subpath out into a new repo
git filter-branch --prune-empty --subdirectory-filter lib master
</code></pre>
<p>additional info - <a href="https://help.github.com/articles/splitting-a-subpath-out-into-a-new-repo">github:help</a></p>
