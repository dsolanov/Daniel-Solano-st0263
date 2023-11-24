# LAB 3.0: Creación de un Clúster EMR

| Información | Universidad EAFIT 2023-2 |
| --- | --- |
| Materia | Tópicos Especiales en Telemática -> Laboratorio 3-2 y 3-3 |
| Curso | ST0263 |
| Estudiante | Daniel Alfonso Solano Velásquez (mailto:dsolano@eafit.edu.co) |
| Profesor | Edwin Nelson Montoya Munera (mailto:emontoya@eafit.edu.co) |

# 1. Objetivo

El objetivo de este laboratorio es implementar un Data Warehouse con BigQuery.

---

# 2. Aspectos solucionados

#### 1. Creacion de un Bucket en GCP Cloud Storage.
#### 2. Subir datos al Bucket creado de Cloud Storage.
#### 3. Crear Conjunto de Datos y Tabla en BigQuery.
#### 4. Auto-Inferencia de Esquema de los datos almacenados en Cloud Storage.
#### 5. Hacer consultas SQL haciendo uso de BigQuery a los datos que almacenamos en Cloud Storage.

# 3. Ejecucion

## Guia

### Primer paso: Creacion de un Bucket en GCP Cloud Storage.
1. Iniciar sesion en GCP academico con su correo institucional y usar el codigo promocional que el profesor consiguio para usted.
2. Una vez haya iniciado sesion, dirigirse al buscador y digitar 'Cloud Storage'.
3. Luego de hacer click en 'Cloud Storage'.

[![1.png](https://i.postimg.cc/DyDBPXGC/1.png)](https://postimg.cc/bsxxzd3b)

4. Luego verá la pestaña 'Buckets' en el panel izquierdo. Dar click ahí y luego click en 'CREAR'.

[![2.png](https://i.postimg.cc/j5sXSQVj/2.png)](https://postimg.cc/1gj6WF3x)

5. Daremos nombre a nuestro Bucket (de su gusto) y donde dice 'Elige dónde almacenar tus datos' seleccionaremos la opcion 'Region' y seguido de este escogeremos la region llamada 'us-central1 (lowa)', y para finalizar haremos click en la parte inferior donde dice CREAR.

[![3.png](https://i.postimg.cc/R0T7y63x/3.png)](https://postimg.cc/t1YnVgtB)

> !Ya tenemos el Bucket creado en GCP Cloud Storage!

[![4.png](https://i.postimg.cc/0j7X65Wk/4.png)](https://postimg.cc/zHXF6NY6)


### Segundo paso: Subir datos al Bucket creado de Cloud Storage.
1. Nos dirigimos al buscador de GCP y digitamos 'Cloud Storage', y luego damos click en el nombre del Bucket que creamos en el paso anterior.

[![5.png](https://i.postimg.cc/bNxNPQRM/5.png)](https://postimg.cc/SJKp7Y37)

  > NOTA: antes de seguir avanzando en los 'paso a paso' por favor descargar el 'dataset' que se encuentra en este link: (https://github.com/dsolanov/Daniel-Solano-st0263/tree/main/Reto%203.2%20y%203.3).

  > Asegurese de descargar los archivos que allí se encuentran (son 6).


Continuemos...


2. Una vez en el Bucket daremos click en el botón 'SUBIR ARCHIVOS'.

[![6.png](https://i.postimg.cc/HxwPnsPp/6.png)](https://postimg.cc/R60Tb9B8)

3. Luego de haber dado click en 'SUBIR ARCHIVOS' seleccionaremos los archivos del dataset que que fueron descargados del [Dataset](https://github.com/dsolanov/Daniel-Solano-st0263/tree/main/Reto%203.2%20y%203.3) y haremos click en 'Abrir'.

[![7.png](https://i.postimg.cc/xTTFjQG2/7.png)](https://postimg.cc/PN9MKBF3)

4. Una vez creado se verá así:

[![8.png](https://i.postimg.cc/65kjrZJ9/8.png)](https://postimg.cc/w7kQH7jP)

> Hemos logrado subir datos al Bucket que creamos!



### Tercer paso: Crear Conjunto de Datos y Tabla en BigQuery.
1. Nos dirigimos al buscandor de GCP y digitamos 'Big Query', y seleccionamos la primera opcion que dice 'Big Query'.

[![9.png](https://i.postimg.cc/k4h3q5VB/9.png)](https://postimg.cc/JDJdQM5L)

2. Una vez ahí, verificamos que estemos en la opción 'cosmic-quarter-346419' el cual sería el nombre de nuestro proyecto.
> Que en mi caso fue un nombre dado aleatoriamente por GCP. 

Luego haremos click en los 3 puntos y seleccionamos la opción 'Crear un conjunto de datos'.

[![10.png](https://i.postimg.cc/L69CNShW/10.png)](https://postimg.cc/BtzBndT5)

3. Luego:
    - Daremos nombre a nuestro conjunto de datos.
    - Seleccionaremos la región.
    - Escogemos la región: us-central (lowa).
    - Por último daremos click en 'CREAR CONJUNTO DE DATOS'.

[![11.png](https://i.postimg.cc/Hx135DfB/11.png)](https://postimg.cc/sBKpd8fh)

Y se verá de esta forma:

[![12.png](https://i.postimg.cc/SxXGvx4g/12.png)](https://postimg.cc/bZhbG8sn)

4. Luego, en el panel izquierdo de GCP, veremos que se ha creado nuestro conjunto de datos, y lo siguiente será crear una tabla, y para esto debemos dar click en los 3 puntos y escoger la opción 'Crear tabla'.

[![13.png](https://i.postimg.cc/tgQFvd2g/13.png)](https://postimg.cc/759Cfzvv)

5. En esta seccion escogeremos la opcion 'Goolge Cloud Storage' y luego haremos click en boton 'EXPLORAR'.

[![14.png](https://i.postimg.cc/TY5L8Ly5/14.png)](https://postimg.cc/rKcFxpNq)

Seleccionamos el archivo y luego hacemos click en 'SELECCIONAR'.

[![16.png](https://i.postimg.cc/PJwt7D6t/16.png)](https://postimg.cc/PvdspCsc)

6. En este paso debemos corregir el apartado 'Selecciona un archivo del bucket de GCS o usa un patrón de URI' borrando el nombre del archivo y reemplazandolo por el nombre del Bucket + /*.csv

Por lo que derá quedar de la siguiente forma:

  ```bash
  nombre_bucket/*.csv
  ```

Para mi caso, quedó como: 
```bash
bucket_labs_3-2_3-3/*.csv.
```

Notese tambien que el apartado 'Formato de archivo' se modifico solo.

Ahora en el apartado 'Tabla *' pondremos un nombre para nuestra tabla, en mi casa usé 'retail-table' y en el apartado 'Tipo de tabla' escogemos la opcion 'Tabla externa'.

Luego seleccionamos la opcion 'Deteccion automatica' que se encuentra en el apartado ESQUEMA.

Por ultimo, hacemos click en 'CREAR TABLA'.

[![17.png](https://i.postimg.cc/zfxKDmqy/17.png)](https://postimg.cc/qtCzQ5hr)

Se debe ver así:

[![18.png](https://i.postimg.cc/DfHH6Ztw/18.png)](https://postimg.cc/mh3m2bLv)

Y eso es todo, haz sabido crear una tabla de BigQuery la cual esta dirigida a los datos que estan presentes en el Bucket de GCP Cloud Storage!.


### Cuarto paso: Auto-Inferencia de Esquema de los datos almacenados en Cloud Storage.
1. Nos dirigimos al buscador de GCP y digitamos 'Big Query' y seleccionamos la primera opcion que es 'Big Query'.
2. Una vez allí haremos click sobre la tabla que creamos anteriormente (retail-table)

[![19.png](https://i.postimg.cc/zBRSGJpx/19.png)](https://postimg.cc/phRn0Mwj)

3. Una vez allí, hacemos click en 'CONSULTA' y este desplegará 2 opciones, de las cuales escogeremos la que dice 'En una pestaña nueva'.

[![20.png](https://i.postimg.cc/Xvr9sjMn/20.png)](https://postimg.cc/hJqJjqPY)

4. Una vez abierta la nueva pestaña tendremos algo como en la siguiente imagen, donde ejecutaremos la linea 1 (la cual es para realizar una consulta SQL a la tabla).
- 1. Pero primero que todo, debemos añadir el simbolo '*' ya que por defecto no esta incluida en la linea de codigo.
La estructura es la siguiente:

```bash
SELECT * FROM `nombre_proyecto.nombre_conjunto_de_datos.nombre_tabla`
```

  Por lo que en mi caso quedó como:
```bash
SELECT * FROM `cosmic-quarter-346419.Big_Query_Dataset.retail-table``
```

- 2. Una vez corregido esto, procedemos a dar click en 'EJECUTAR'
- 3. Vemos reflejados los datos en la tabla
 
[![21.png](https://i.postimg.cc/3rmVL77j/21.png)](https://postimg.cc/8skZ527s)


## FIN DE LOS RETOS 3.2 Y 3.3
