-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2021 a las 14:22:24
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `novedades_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `claveadmin`
--

CREATE TABLE `claveadmin` (
  `id_clave` int(11) NOT NULL,
  `clave` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `claveadmin`
--

INSERT INTO `claveadmin` (`id_clave`, `clave`) VALUES
(1, 'crica19xx');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id_novedad` int(11) NOT NULL,
  `com_usuario` varchar(60) NOT NULL,
  `com_datetime` datetime NOT NULL,
  `comentario` varchar(300) NOT NULL,
  `res_usuario` varchar(60) NOT NULL,
  `res_datetime` datetime NOT NULL,
  `respuesta` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id_novedad`, `com_usuario`, `com_datetime`, `comentario`, `res_usuario`, `res_datetime`, `respuesta`) VALUES
(62, 'Juan Roman Riquelme', '2021-11-13 12:37:00', 'Es un exfutbolista argentino y actual vicepresidente y director deportivo del Club Atlético Boca Juniors.​ Como jugador, se desempeñaba en la posición de mediocampista ofensivo, en el rol de enganche, donde se destacó como uno de los mejores jugadores de su generación.', '', '0000-00-00 00:00:00', 'undefined'),
(63, 'Frankie Lampard', '2021-11-13 12:38:00', 'Es un exfutbolista y actual entrenador inglés. Jugaba como centrocampista y su último equipo fue el New York City de la Major League Soccer. Actualmente dirige al Norwich City Football Club de la Premier League de Inglaterra.', '', '0000-00-00 00:00:00', ''),
(64, 'Steven Gerrard', '2021-11-13 12:39:00', 'Es un exfutbolista y actual entrenador inglés. Jugaba como centrocampista y su último club fue Los Angeles Galaxy de la Major League Soccer. Actualmente dirige al Aston Villa F. C. de la Premier League de Inglaterra.', '', '0000-00-00 00:00:00', ''),
(65, 'Zinedine Zidane', '2021-11-13 12:40:00', 'Nacido en Marsella, Francia, el 23 de junio de 1972, fue el tercero de cinco hijos: Djamel, Farid, Nourredine y Lila, que crecieron en La Castellane,18​ debido a la emigración de sus padres Smaïl y Malika de Aguemoune, con motivo de la guerra de Argelia hacia París y luego a Marsella en 1962.', '', '0000-00-00 00:00:00', ''),
(66, 'Ronaldinho', '2021-11-13 12:41:00', 'mejor conocido como Ronaldinho Gaúcho o simplemente Ronaldinho es un exjugador de fútbol brasileño nacionalizado español. Es mundialmente reconocido como uno de los talentos más grandes en la historia de dicho deporte.', '', '0000-00-00 00:00:00', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `claveadmin`
--
ALTER TABLE `claveadmin`
  ADD PRIMARY KEY (`id_clave`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id_novedad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `claveadmin`
--
ALTER TABLE `claveadmin`
  MODIFY `id_clave` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id_novedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
