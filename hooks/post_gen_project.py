import os

TERMINATOR = "\x1b[0m"
WARNING = "\x1b[1;33m [WARNING]: "
INFO = "\x1b[1;33m [INFO]: "
HINT = "\x1b[3;33m"
SUCCESS = "\x1b[1;32m [SUCCESS]: "


def remove_open_source_license_files():
    file_names = ["CONTRIBUTORS.txt", "LICENSE"]
    for file_name in file_names:
        try:
            os.remove(file_name)
        except Exception:
            print(f"{WARNING}Failed to delete {file_name}. Please delete it manually.{TERMINATOR}")


def remove_file(file_name: str):
    try:
        os.remove(file_name)
        print(f"{INFO}Removed {file_name}.{TERMINATOR}")
    except Exception:
        print(f"{WARNING}Failed to delete {file_name}. Please delete it manually.{TERMINATOR}")


def install_npm():
    os.system("npm install")
    print(f"{SUCCESS}Dependencies installed successfully.{TERMINATOR}")


def main():
    # Remove license file if not open source
    if "{{ cookiecutter.open_source_license }}" == "Not open source":
        remove_open_source_license_files()

    # Remove robots.txt
    if "{{ cookiecutter.add_robots_txt }}" == "n":
        remove_file("robots.txt")

    # Remove sitemap.xml file
    if "{{ cookiecutter.add_sitemap }}" == "n":
        remove_file("sitemap.xml")

    # Remove Dockerfile
    if "{{ cookiecutter.add_docker }}" == "n":
        remove_file("Dockerfile")
        remove_file(".dockerignore")
        remove_file("docker-compose.yaml")
        remove_file("default.conf")

    # Remove docker-compose.yaml
    if "{{ cookiecutter.add_docker }}" == "y" and "{{ cookiecutter.add_docker_compose }}" == "n":
        remove_file("docker-compose.yaml")

    # Add Project name in index file
    project_name = "{{ cookiecutter.project_name }}"
    with open(os.path.join(os.getcwd(), "src/index.html"), "r+") as f:
        file_contents = f.read().replace("[[project_name]]", project_name)
        f.seek(0)
        f.write(file_contents)
        f.truncate()

    if "{{ cookiecutter.is_install_npm }}" == "y":
        install_npm()

    if "{{ cookiecutter.initialize_git }}" == "y":
        os.system(f"git init -q -b main {os.getcwd()}")
        print(f"{SUCCESS}Git init successful.{TERMINATOR}")

    if "{{ cookiecutter.initialize_git }}" == "y" and "{{ cookiecutter.first_commit }}" == "y":
        project_name = "{{ cookiecutter.project_name }}"
        os.system(f"git add {os.getcwd()}")
        os.system(f"git commit -m '{project_name} created.'")
        print(f"{SUCCESS}Initial commit successful.{TERMINATOR}")

    print(f"{SUCCESS}Project initialized, keep up the good work!{TERMINATOR}")


if __name__ == "__main__":
    main()
