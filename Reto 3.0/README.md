# LAB 3.0: Creación de un Clúster EMR

| Información | Universidad EAFIT 2023-2 |
| --- | --- |
| Materia | Tópicos Especiales en Telemática |
| Curso | ST0263 |
| Estudiante | Daniel Alfonso Solano Velásquez (mailto:dsolano@eafit.edu.co) |
| Profesor | Edwin Nelson Montoya Munera (mailto:emontoya@eafit.edu.co) |

# 1. Objetivo

El objetivo de este laboratorio es crear un clúster de Amazon EMR en AWS para realizar los laboratorios restantes de la materia.

---

# 2. Aspectos solucionados

#### 1. Creacion de par de claves
#### 2. Creacion de un Bucket
#### 3. Creacion de un Cluster
#### 4. Conexion SSH con Nodo Maestro
#### 5. Servicio HUE funcional
#### 6. Servicio JUPYTERHUB funcional

# 3. Ejecucion

## Guia

### Primer paso: Creacion de de par de claves
1. Iniciar sesion en la consola AWS
2. Una vez haya iniciado sesion, dirigirse al buscador y digitar 'EC2' y seleccionar la opcion 'EC2'
3. Luego de hacer click en 'EC2' verá la opción que dice 'Key Pairs' o ' Pares de Clave' (dependiendo del idioma en el que posea su navegador)
y hará click en esa opcion.

[![1.png](https://i.postimg.cc/HnzbygYG/1.png)](https://postimg.cc/hQJXkNQM)

4. Luego verá la opcion en la esquina superior derecha que dice 'Create Key Pair' o ' Crear par de claves', haremos click en ese boton.

[![2.png](https://i.postimg.cc/28Bzyx2G/2.png)](https://postimg.cc/zV8mPTmH)

5. Daremos nombre a nuestra 'key' o 'clave' y donde dice 'Private key file format' o 'formato de archivo de clave privada', seleccionamos la opcion '.ppk' y seguido de esto haremos click donde dice 'Create key pair' o 'Crear par de claves'.

[![3.png](https://i.postimg.cc/bY5yq5Hd/3.png)](https://postimg.cc/DmqkgBNK)

6. Una vez haya dando click en el boton de 'Create key pair' se descargará un archivo en su ordenador local, en este caso en la pestaña de 'descargas' o 'downloads' de Google Chrome.

[![4.png](https://i.postimg.cc/kGLqwVXW/4.png)](https://postimg.cc/kRN0ggS5)


### Segundo paso: Creacion de un Bucket
1. Nos dirigimos al buscador de AWS y digitamos 'S3' y escogemos la primera opcion que no sale la cual es 'S3', una vez allí daremos click en 'Create Bucket' o 'Crear Bucket', la cual se encuentra en la parte superior derecha de la pantalla.

[![5.png](https://i.postimg.cc/x8X9KGY0/5.png)](https://postimg.cc/zH1mNgVM)

2. Daremos nombre a nuestro bucket, luego en region escogemos 'US East (N. Virginia) us-east-1' o bien puede ser 'EE.UU Este (Norte de Virginia) us-east-1'.

[![6.png](https://i.postimg.cc/FKxFmsDQ/6.png)](https://postimg.cc/kVBPvC0j)

3. Las demás opciones las dejaremos como vienen por defecto y nos dirigiremos a la parte inferior donde esta el boton de 'Create Bucket' o 'Crear Bucket' y haremos click en el.

[![7.png](https://i.postimg.cc/0QW8MWTW/7.png)](https://postimg.cc/xJmrBRTM)

4. Una vez creado se verá así:

[![8.png](https://i.postimg.cc/xCTfdD4N/8.png)](https://postimg.cc/LqwKy7Rm)


### Tercer paso: Creacion de un Cluster
1. Nos dirigimos al buscandor de AWS y digitamos 'EMR', y seleccionamos la primera opcion que dice 'EMR'.
2. Una vez ahí, verificamos que estemos en la pestaña 'Clusters' del panel izquierdo de AWS, y luego daremos click en el boton 'Create Cluster' o 'Crear Cluster' que se encuentra en la parte superior derecha de la pantalla.

[![9.png](https://i.postimg.cc/28PS7tVg/9.png)](https://postimg.cc/56SJxn5m)

3. Luego:
    - daremos nombre a nuestro Cluster.
    - seleccionaremos la version 'emr-6.14.0'.
    - daremos click en 'Custom'.
    - Seleccionaremos las opciones que se ven 'chuleadas' o con la marca 'check' en la imagen.
    - Seleccionamos las 2 opciones de 'AWS Glue Data Catalog settings' o bien 'Configuración del Catálogo de Datos de AWS Glue' como se muestra en la imagen.
    - Lo demás se deja por defecto como se muestra en la imagen.

[![10.png](https://i.postimg.cc/nLxV6QKk/10.png)](https://postimg.cc/zyd1hvcb)

4. Verificamos que en el apartado 'Cluster Configuration o 'Configuracion del cluster' se encuentre seleccionada la opcion 'Instance groups' o 'Grupos de instancia'
Y a su vez verificamos que los demas apartados esten con la opcion 'm5.xlarge', los cuales vienen seleccionados por defecto.

[![11.png](https://i.postimg.cc/4xVNL1cy/11.png)](https://postimg.cc/HrWgjXB1)

5. En la seccion 'Cluster termination' o 'Terminación del Clúster', seleccionaremos la opcion 3: 'Automatically terminate cluster after idle time (Recommended)' o 'Terminar el clúster despues del tiempo de inactividad (recomendado)' y le añadiremos un poco de tiempo, ya que por defecto viene con 01:00:00 (1 hora) y lo aumentaremos a 03:00:00 (3 horas), parandonos justo entre el '0' y el '3' y en vez de borrar solo digitamos el numero '3'.

[![12.png](https://i.postimg.cc/RhhZg51x/12.png)](https://postimg.cc/hQFnGY32)

6. Las seccionaes que vayan desde 'Cluster termination' hasta ' Software Settings' dejenlas como vienen por defecto.
7. Una vez lleguen a la seccion 'Software Settings - optional' o ' Editar la configuración de software: opcional' deberán verificar que la opcion 'Enter configuration' o 'Ingresar la configuracion' este seleccionada y en el recuadro blanco pondra el siguiente codigo:

    ```json
    [
      {
        "Classification": "jupyter-s3-conf",
        "Properties": {
          "s3.persistence.enabled": "true",
          "s3.persistence.bucket": "nombre_bucket_creado"
        }
      }
    ]
    ```

Para mi caso, el nombre del mi bucket fue 'dsolanonotebook'.

[![13.png](https://i.postimg.cc/59K06y14/13.png)](https://postimg.cc/bdb85zsW)

8. Luego nos dirigimos a la seccion 'Security configuration and EC2 key pair - optional' o 'Configuración de seguridad y par de claves de EC2: opcional' y seguiremos los pasos enumerados como se ven en la imagen:
    - Buscamos y seleccionamos el nombre de nuestro Cluster.
    - Seleccionamos la opcion 'Choose an existing service role' o 'Elegir un rol de servicio existente'.
    - Buscamos y seleccionamos la opción 'EMR_DefaultRole'.
    - Seleccionamos la opcion 'Choose an existing instance profile' o 'Elegir un perfil de instancia existente'.
    - Buscamos y seleccionamos la opción 'EMR_EC2_DefaultRole'.
    - Buscamos y seleccionamos la opción 'LabRole'.
    - Por ultimo daremos click en 'Create cluster' o 'Crear clúster' que se encuentra en la parte derecha de la pantalla.

[![14.png](https://i.postimg.cc/WbD4rVbM/14.png)](https://postimg.cc/WhvjLQZ3)


### Cuarto paso: Conexion SSH con Nodo Maestro
1. Nos dirigimos al buscador de AWS y digitamos 'EMR' y seleccionamos la primera opcion que es 'EMR'.
2. Una vez allí haremos click sobre el cluster que creamos, el cual se encuentra en la columna 'Cluster ID' o 'ID del clúster' (que se encuentra en estado: 'waiting' o 'esperando').

[![15.png](https://i.postimg.cc/JnPh34kQ/15.png)](https://postimg.cc/Vr01mw4S)

3. Una vez allí, en el panel izquierdo de AWS buscaremos la opcion que dice 'Block public access' o 'Bloquear el acceso público' y haremos click en ella.

[![16.png](https://i.postimg.cc/prSX7Gkh/16.png)](https://postimg.cc/JHbLHQfM)

4. Luego de dar click sobre 'Block public access' o 'Bloquear el acceso público' veremos el boton 'Edit' o 'Editar' y haremos click sobre el.

[![17.png](https://i.postimg.cc/bJzJ22sJ/17.png)](https://postimg.cc/8F0D2cdQ)

5. Luego seleccionaremos la opcion 'Turn off' o 'Desactivar' y daremos click en el boton 'Save' o 'Guardar'.

[![18.png](https://i.postimg.cc/SKLRsGQ3/18.png)](https://postimg.cc/VS6mZnCW)

6. Una vez Guardado se verá así:

[![19.png](https://i.postimg.cc/Gpn9dfRv/19.png)](https://postimg.cc/VJ4zFDdN)

7. Luego, en el buscador de AWS digitaremos 'EMR' y en el apartado 'Clusters', daremos click nuevamente sobre el cluster que creamos.

[![20.png](https://i.postimg.cc/nhDC8JyH/20.png)](https://postimg.cc/75qx7pPc)

8. Una vez allí iremos a la pestaña 'Applications' o 'Aplicaciones'.

[![21.png](https://i.postimg.cc/VLTdH6HG/21.png)](https://postimg.cc/9rdmDW2Z)

[![22.png](https://i.postimg.cc/yYWDP9n3/22.png)](https://postimg.cc/HVDWWrqT)

9. Se debrán abrir los puertos TCP que señalamos anteriormente, y a su vez tambien deberemos abrir los puertos:
    - 22
    - 14000
    - 9878 

10. Para abrirlos, nos dirigimos al buscador de AWS y digitamos 'EC2' e ingresamos a la primera opcion 'EC2'.
11. Una vez allí, daremos click en la opcion 'Instances (running)' o 'Instancias (en ejecución)'.

[![23.png](https://i.postimg.cc/90QrsqhS/23.png)](https://postimg.cc/Vr2fCv5B)

12. Una vez seleccionada la opcion anterior daremos click en la instancia que tenga el 'Security group name' o 'nombre grupo de seguridad' llamado 'ElasticMapReduce-master'
Nota: debe ser el que diga 'master' al final, ya que los otros 2 son 'slave'.

[![24.png](https://i.postimg.cc/ZRcWfx1p/24.png)](https://postimg.cc/PpCfJYf5)

13. Una vez hecho click sobre la instacia, no dirigimos a la pestaña 'Security' o 'Seguridad'.

[![25.png](https://i.postimg.cc/cCkrW41J/25.png)](https://postimg.cc/xNH0yQzr)

14. Estando en la pestaña 'Security o 'Seguridad' haremos click en el enlace que se encuentra en la seccion 'Security groups' o 'Grupos de seguridad'.

[![26.png](https://i.postimg.cc/SQgXCVLp/26.png)](https://postimg.cc/WtJbPGf9)

15. Luego daremos click en 'Edit inbound rules' o 'Editar reglas de entrada'.

[![27.png](https://i.postimg.cc/G2rBJ5Sb/27.png)](https://postimg.cc/bGCNq3h5)

16. Una vez abierto el editor de reglas, daremos click en 'Add rule' o 'Agregar regla' donde añadiremos cada uno de los puertos que vimos en el numeral 8 y tambien los puerto que mencionamos en el numeral 9. Y por ultimo haciendo click en el boton 'Save Rules' o 'Guardar Reglas'.

[![28.png](https://i.postimg.cc/Gm8scYyn/28.png)](https://postimg.cc/Sn4Kdndg)

[![29.png](https://i.postimg.cc/Zq6BNSHf/29.png)](https://postimg.cc/7CYZvjp7)


### Quinto paso: Servicio HUE funcional
1. Nos vamos al buscador de AWS y digitamos 'EMR', luego seleccionamos la primera opcion que es 'EMR'.
2. Una vez allí damos click sobre cluster creado que debe tener el estado 'Waiting' o 'Esperando'.

[![30.png](https://i.postimg.cc/yYNZb26d/30.png)](https://postimg.cc/bdKrGCtc)

3. Luego de haber dado click sobre el cluster, nos dirigimos a la pestaña ' Applications' o 'Aplicaciones'.

[![21.png](https://i.postimg.cc/VLTdH6HG/21.png)](https://postimg.cc/9rdmDW2Z)

4. Una vez allí nos dirigimos hacía la seccion 'Application UIs on the primary node' o 'IU de la aplicación en el nodo principal', y allí veremos varias opciones de aplicacion con sus respectivas URL.
Para nuestro caso haremos click en la URL cuya aplicacion lleva por nombre 'HUE' o 'Tolerancia'.

[![32.png](https://i.postimg.cc/FHMk1Ryd/32.png)](https://postimg.cc/rD9wPqYM)

5. La URL nos lleva a la siguiente vista, donde tendremos que ingresar nombre de usuario y una contraseña.
El nombre de usuario es 'hadoop' y la contraseña puede ser cualquiera de su agrado.

[![33.png](https://i.postimg.cc/kMsSw7mz/33.png)](https://postimg.cc/vD1DZFDt)

6. Una vez ingresado el nombre de usuario y la contraseña, se verá de esta forma:

[![34.png](https://i.postimg.cc/nr3QLG2p/34.png)](https://postimg.cc/H87LZ5Fh)

7. Y ya estamos listos para gestionar archivos mediante el uso de HUE para HDFS.


### Sexto paso: Servicio JUPYTERHUB funcional
1. Nos devolvemos al 'quito paso, punto 3' y allí volveremos a ver las aplicaciones con sus respectivas URL, y en este caso no daremos click en la URL de HUE si no en la URL de 'JupyterHub'.

[![35.png](https://i.postimg.cc/prWFx6Ds/35.png)](https://postimg.cc/62P3fzbZ)

2. Nos abrira una vista web la cual saldra con un mensaje de seguridad, diciendo que la pagina web no es segura.
Por lo que haremos click en 'Configuracón avanzada'.

[![36.png](https://i.postimg.cc/XJcCRbyZ/36.png)](https://postimg.cc/xJ88mB5Y)

3. Una vez hecho click en 'Configuración avanzada' daremos click donde dice 'Continuar a ...'.

[![37.png](https://i.postimg.cc/9Mj9gMz5/37.png)](https://postimg.cc/gwNrnGvN)

4. Luego de haber avanzado nos cargará el siguiente login de JupyterHub, cuyo usuario es 'jovyan' y la contraseña es 'jupyter'.

[![38.png](https://i.postimg.cc/zfhWkWzF/38.png)](https://postimg.cc/4KJmfYhY)

5. Luego del inicio de sesion en jupyterhub, nos aparecerá la siguiente vista, en la cual nos dirigiremos al apartado 'NEW', como se muestra en la imagen.

[![39.png](https://i.postimg.cc/dtQ2KL6J/39.png)](https://postimg.cc/0r3MY5h4)

6. Una vez desplegadas las opciones de 'NEW' daremos click en la opcion 'PySpark'.

[![40.png](https://i.postimg.cc/DyCqfnpL/40.png)](https://postimg.cc/ZCd9VtS5)

7. Luego de haber dado click sobre 'PySpark' veremos un editor de jupyter como se ve en la siguiente imagen.

[![41.png](https://i.postimg.cc/bws1sW4M/41.png)](https://postimg.cc/LJFJWC9B)

8. Para finalizar digitaremos la palabra 'spark' en la linea 1 y daremos click en RUN.
(Esperamos unos cuantos segundos a que cargue la informacion, dura un poco menos de 1 min).
Luego de que haya salido la informacion, en la linea 2 digitamos 'sc' y esperamos un par de segundos.

[![42.png](https://i.postimg.cc/BnkHDN0v/42.png)](https://postimg.cc/Mn0nJ7Xk)

## FIN DEL RETO 3.0
