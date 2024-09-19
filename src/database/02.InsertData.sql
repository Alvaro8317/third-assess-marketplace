INSERT INTO categorias (nombre, descripcion) VALUES
('Frutas', 'Categoría para frutas frescas y exóticas.'),
('Vegetales', 'Categoría para vegetales y hortalizas.'),
('Cereales', 'Categoría para granos y cereales.'),
('Hierbas y Especias', 'Categoría para hierbas frescas, secas y especias.'),
('Productos Orgánicos', 'Categoría para productos certificados como orgánicos.');

INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES
('Manzana', 'Manzana fresca y crujiente.', 1500, 100, 1),
('Zanahoria', 'Zanahorias frescas y crujientes.', 800, 150, 2),
('Arroz Integral', 'Arroz integral de alta calidad.', 2000, 50, 3),
('Albahaca', 'Hierba aromática fresca.', 1200, 30, 4),
('Quinoa Orgánica', 'Quinoa certificada como orgánica.', 3500, 20, 5);

REFRESH MATERIALIZED VIEW vista_stock_por_categoria;