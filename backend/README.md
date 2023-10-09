# Directory Listing API

## Environment File
Before running the application, ensure that you have an environment file `.env` at the root of the backend project.

The `.env` file should contain value definitions for the following variables
```
NODE_ENV={{node_env}}
APP_LISTENER_PORT={{app_listener_port}} - The port that the webserver / app is listening on
ADMIN_USER={{admin_user}} - Must be set to make authenticated requests
ADMIN_PASS={{admin_pass}} - Must be set to make authenticated requests
CONTAINER_MOUNT_POINT={{container_mount_point}} - Only set if intending to run in Docker - should match the container mount point in the docker run command
```

## Run on Local Server

To run the application in dev mode with hot reload functionality:
```shell
npm run dev
```

To run the application without hot reload:
```shell
npm run start
```

## Run in Docker 

To build the latest version of the image:
```shell
docker build -t [build-tag]
```

To start the application in a Docker container:
```shell
docker run -p 80:[APP_LISTENER_PORT] --env-file [/path/to/.env] -v [/root/path/on/host]:[CONTAINER_MOUNT_POINT] [build-tag]
```

## Example Output
```shell
$ curl -i localhost -H "Authorization: Basic YWRtaW46YWRtaW4="

HTTP/1.1 206 Partial Content
X-Powered-By: Express
Content-Type: application/octet-stream
Date: Mon, 09 Oct 2023 19:27:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"name":".angular-config.json","path":"/tmp/.angular-config.json","is_directory":false,"file_ext":".json","file_size":142,"file_created":0,"file_permissions":"0777"}
{"name":".aws","path":"/tmp/.aws","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":".azure","path":"/tmp/.azure","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":".bash_history","path":"/tmp/.bash_history","is_directory":false,"file_ext":"","file_size":931,"file_created":0,"file_permissions":"0777"}
{"name":".docker","path":"/tmp/.docker","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":".gitconfig","path":"/tmp/.gitconfig","is_directory":false,"file_ext":"","file_size":94,"file_created":0,"file_permissions":"0777"}
{"name":".lesshst","path":"/tmp/.lesshst","is_directory":false,"file_ext":"","file_size":20,"file_created":0,"file_permissions":"0777"}
{"name":".ms-ad","path":"/tmp/.ms-ad","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"3D Objects","path":"/tmp/3D Objects","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"AppData","path":"/tmp/AppData","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Contacts","path":"/tmp/Contacts","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Documents","path":"/tmp/Documents","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Downloads","path":"/tmp/Downloads","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Favorites","path":"/tmp/Favorites","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"IntelGraphicsProfiles","path":"/tmp/IntelGraphicsProfiles","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Links","path":"/tmp/Links","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Music","path":"/tmp/Music","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"NTUSER.DAT","path":"/tmp/NTUSER.DAT","is_directory":false,"file_ext":".DAT","file_size":3145728,"file_created":0,"file_permissions":"0777"}
{"name":"ntuser.dat.LOG1","path":"/tmp/ntuser.dat.LOG1","is_directory":false,"file_ext":".LOG1","file_size":815104,"file_created":0,"file_permissions":"0777"}
{"name":"ntuser.dat.LOG2","path":"/tmp/ntuser.dat.LOG2","is_directory":false,"file_ext":".LOG2","file_size":792576,"file_created":0,"file_permissions":"0777"}
{"name":"NTUSER.DAT{981e05e2-ca7a-11ed-9075-a834a04ca9f1}.TM.blf","path":"/tmp/NTUSER.DAT{981e05e2-ca7a-11ed-9075-a834a04ca9f1}.TM.blf","is_directory":false,"file_ext":".blf","file_size":65536,"file_created":0,"file_permissions":"0777"}
{"name":"NTUSER.DAT{981e05e2-ca7a-11ed-9075-a834a04ca9f1}.TMContainer00000000000000000001.regtrans-ms","path":"/tmp/NTUSER.DAT{981e05e2-ca7a-11ed-9075-a834a04ca9f1}.TMContainer00000000000000000001.regtrans-ms","is_directory":false,"file_ext":".regtrans-ms","file_size":524288,"file_created":0,"file_permissions":"0777"}
{"name":"NTUSER.DAT{981e05e2-ca7a-11ed-9075-a834a04ca9f1}.TMContainer00000000000000000002.regtrans-ms","path":"/tmp/NTUSER.DAT{981e05e2-ca7a-11ed-9075-a834a04ca9f1}.TMContainer00000000000000000002.regtrans-ms","is_directory":false,"file_ext":".regtrans-ms","file_size":524288,"file_created":0,"file_permissions":"0777"}
{"name":"ntuser.ini","path":"/tmp/ntuser.ini","is_directory":false,"file_ext":".ini","file_size":20,"file_created":0,"file_permissions":"0777"}
{"name":"OneDrive","path":"/tmp/OneDrive","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Pictures","path":"/tmp/Pictures","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Saved Games","path":"/tmp/Saved Games","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Searches","path":"/tmp/Searches","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"Videos","path":"/tmp/Videos","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
{"name":"WebstormProjects","path":"/tmp/WebstormProjects","is_directory":true,"file_ext":"","file_size":512,"file_created":0,"file_permissions":"0777"}
```