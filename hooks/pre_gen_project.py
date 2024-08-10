# The content of this string is evaluated by Jinja, and plays an important role.
# It updates the cookiecutter context to trim leading and trailing spaces
# from domain/email values
"""
{{ cookiecutter.update({ "email": cookiecutter.author_email | trim }) }}
{{ cookiecutter.update({ "domain_name": cookiecutter.domain_name | trim }) }}
{{ cookiecutter.update({ "api_domain": cookiecutter.api_domain | trim }) }}
{{ cookiecutter.update({ "api_base_url": cookiecutter.api_base_url | trim }) }}
"""


project_slug = "{{ cookiecutter.project_slug }}"
if hasattr(project_slug, "isidentifier"):
    assert project_slug.isidentifier(), "'{}' project slug is not a valid Python identifier.".format(project_slug)

assert project_slug == project_slug.lower(), "'{}' project slug should be all lowercase".format(project_slug)

assert "\\" not in "{{ cookiecutter.author_name }}", "Don't include backslashes in author name."

