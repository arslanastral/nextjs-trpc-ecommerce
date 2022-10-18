## Quickstart

- [Run locally](#how-to-run-locally)
- [Overall General workflow](#overall-general-workflow)

## How to Run Locally:

1. Clone this repository
   ```sh
   git clone https://github.com/chingu-voyages/v41-bears-team-32.git
   ```
2. Move into v41-bears-team-32 directory
   ```sh
   cd v41-bears-team-32
   ```
3. Install dependencies
   ```sh
   bundle install && cd client && bundle install $$ cd -
   ```
4. You can start the server and client together by running
   ```sh
   npm run dev
   ```
5. Both applications should be running!
   For frontend go to: `localhost:3000`
   For backend go to: `localhost:3001`

## Overall General Workflow:

Start in the project folder (v41-bears-team-32)

- make sure you are on main branch and the working directory is clean
- git pull origin master
- fix merge conflicts if any
- checkout to new branch `git checkout -b branch_name` or if the branch is already created, `git checkout branch_name`
- work on the code
- add changes `git add path/to/file`
  or to add all files `git add .` \*\*\* this can be dangerous
- commit changes `git commit -m "message describing the change"` - write detailed messages so your teammates know what was fixed and why 
- commit often
  -test before you push, do not push work that is half-complete.
- push your code with  `git push origin branch_name` or `git push origin HEAD` or `ggpush`
- go to GitHub, open a Pull Request(PR), and add a short description of what the PR is trying to solve
- tag collaborators for the PR review (at least one person)
- delete branch once PR review has been approved

[Keys to a well written README](https://tinyurl.com/yk3wubft).
