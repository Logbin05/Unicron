CREATE TABLE roles (
    role_id BIGSERIAL PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE users_finances (
    uf_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    card_id VARCHAR(32),
    currency VARCHAR(3) DEFAULT 'RUB',
    balance NUMERIC(14,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    role_id BIGINT,
    uf_id BIGINT,
    full_name VARCHAR(200) NOT NULL,
    login VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    avatar TEXT,
    password_hash VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE institutions (
    institution_id BIGSERIAL PRIMARY KEY,
    owner_user_id BIGINT,
    institution_name VARCHAR(250) NOT NULL,
    institution_avatar TEXT,
    institution_type institution_type NOT NULL,
    institution_desc TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE institution_members (
    inst_member_id BIGSERIAL PRIMARY KEY,
    institution_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role_in_institution inst_role NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE categories (
    category_id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL DEFAULT 'Другое',
    category_desc TEXT
);

CREATE TABLE courses (
    course_id BIGSERIAL PRIMARY KEY,
    institution_id BIGINT,
    author_id BIGINT,
    category_id BIGINT,
    course_name VARCHAR(300) NOT NULL,
    course_slug VARCHAR(300) UNIQUE NOT NULL,
    course_desc TEXT,
    course_image TEXT,
    price NUMERIC(10,2) DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    visibility VARCHAR(20) DEFAULT 'public',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE modules (
    module_id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    "order" INT NOT NULL DEFAULT 0
);

CREATE TABLE lessons (
    lesson_id BIGSERIAL PRIMARY KEY,
    module_id BIGINT NOT NULL,
    title VARCHAR(300) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_ref TEXT,
    duration_seconds INT,
    position INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE assignments (
    assignment_id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT,
    title VARCHAR(300) NOT NULL,
    kind VARCHAR(100) NOT NULL,
    config JSONB,
    max_score NUMERIC(10,2) DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE enrollments (
    enrollment_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    progress NUMERIC(5,2) DEFAULT 0,
    status enrollment_status DEFAULT 'enrolled',
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE lesson_progress (
    lp_id BIGSERIAL PRIMARY KEY,
    enrollment_id BIGINT,
    lesson_id BIGINT,
    status VARCHAR(30) DEFAULT 'not_started',
    progress NUMERIC(5,2) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE certificates (
    certificate_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT now(),
    metadata JSONB,
    revoked BOOLEAN DEFAULT false
);

CREATE TABLE logs (
    log_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(200) NOT NULL,
    meta JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
    sub_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    sub_item_id BIGINT,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    status subscription_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE services (
    service_id BIGSERIAL PRIMARY KEY,
    course_id BIGINT,
    sub_id BIGINT,
    sku VARCHAR(200) UNIQUE,
    title VARCHAR(300),
    price NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE buy_history (
    bh_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    service_id BIGINT,
    amount NUMERIC(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RUB',
    payment_provider VARCHAR(100),
    provider_payment_id VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE basket (
    basket_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    service_id BIGINT,
    added_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_users_email ON users (email);
CREATE UNIQUE INDEX idx_institution_members_unique ON institution_members (institution_id, user_id);
CREATE INDEX idx_inst_members_inst ON institution_members (institution_id);
CREATE INDEX idx_courses_institution ON courses (institution_id);
CREATE UNIQUE INDEX idx_enrollments_unique ON enrollments (user_id, course_id);
CREATE INDEX idx_enrollments_user ON enrollments (user_id);
CREATE UNIQUE INDEX idx_lesson_progress_unique ON lesson_progress (enrollment_id, lesson_id);

ALTER TABLE users_finances
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL;

ALTER TABLE users
    ADD FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE SET NULL,
    ADD FOREIGN KEY (uf_id) REFERENCES users_finances (uf_id) ON DELETE SET NULL;

ALTER TABLE institutions
    ADD FOREIGN KEY (owner_user_id) REFERENCES users (user_id) ON DELETE SET NULL;

ALTER TABLE institution_members
    ADD FOREIGN KEY (institution_id) REFERENCES institutions (institution_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE;

ALTER TABLE courses
    ADD FOREIGN KEY (institution_id) REFERENCES institutions (institution_id) ON DELETE SET NULL,
    ADD FOREIGN KEY (author_id) REFERENCES users (user_id) ON DELETE SET NULL,
    ADD FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE SET NULL;

ALTER TABLE modules
    ADD FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE;

ALTER TABLE lessons
    ADD FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE;

ALTER TABLE assignments
    ADD FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id) ON DELETE CASCADE;

ALTER TABLE enrollments
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE;

ALTER TABLE lesson_progress
    ADD FOREIGN KEY (enrollment_id) REFERENCES enrollments (enrollment_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id) ON DELETE CASCADE;

ALTER TABLE certificates
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE;

ALTER TABLE logs
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

ALTER TABLE subscriptions
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE;

ALTER TABLE services
    ADD FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE SET NULL,
    ADD FOREIGN KEY (sub_id) REFERENCES subscriptions (sub_id) ON DELETE SET NULL;

ALTER TABLE buy_history
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL,
    ADD FOREIGN KEY (service_id) REFERENCES services (service_id) ON DELETE SET NULL;

ALTER TABLE basket
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    ADD FOREIGN KEY (service_id) REFERENCES services (service_id) ON DELETE SET NULL;
