CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    -- usuario_id INTEGER,
    fecha_orden TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
    estado VARCHAR(50) NOT NULL
    -- FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE ordenes_productos (
    orden_id INTEGER REFERENCES ordenes(id) ON DELETE CASCADE,
    producto_id INTEGER REFERENCES productos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL CHECK (precio_unitario > 0),
    PRIMARY KEY (orden_id, producto_id)
);

CREATE MATERIALIZED VIEW vista_stock_por_categoria AS
SELECT 
    CTG.ID AS CATEGORIA_ID,
    CTG.NOMBRE AS CATEGORIA_NOMBRE,
    SUM(PR.STOCK) AS STOCK_TOTAL
FROM 
    PRODUCTOS PR
INNER JOIN 
    CATEGORIAS CTG 
ON 
    CTG.ID = PR.CATEGORIA_ID
GROUP BY 
    CTG.ID, CTG.NOMBRE;

CREATE OR REPLACE FUNCTION actualizar_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_timestamp_trigger
BEFORE UPDATE ON productos
FOR EACH ROW
EXECUTE FUNCTION actualizar_timestamp();
