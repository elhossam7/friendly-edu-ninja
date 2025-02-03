# Firebase GitHub Workflow Setup Troubleshooting

When setting up automatic builds and deploys with GitHub, you might encounter authorization errors such as:
"The provided authorization cannot be used with this repository. If this repository is in an organization, did you remember to grant access?"

## Resolution Steps

1. Visit: https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
2. Grant access for the Firebase CLI OAuth app to your repository or organization.
3. Verify the repository name is entered correctly (e.g., "elhossam7/freindly-edu-ninja").
4. Rerun the Firebase CLI command once permissions have been updated.

For further details, consult the [Firebase Hosting documentation](https://firebase.google.com/docs/hosting).
