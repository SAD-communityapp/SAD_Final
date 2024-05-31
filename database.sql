PGDMP                      |            SAD_project    16.0    16.0 G    `           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            a           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            b           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            c           1262    32982    SAD_project    DATABASE     �   CREATE DATABASE "SAD_project" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Chinese (Traditional)_Taiwan.950';
    DROP DATABASE "SAD_project";
                postgres    false            �            1255    49451    generate_feedback_id()    FUNCTION       CREATE FUNCTION public.generate_feedback_id() RETURNS character
    LANGUAGE plpgsql
    AS $$
DECLARE
    next_id INT;
    new_id CHAR(15);
BEGIN
    SELECT nextval('feedback_id_seq') INTO next_id;
    new_id := 'FB' || LPAD(next_id::TEXT, 13, '0');
    RETURN new_id;
END;
$$;
 -   DROP FUNCTION public.generate_feedback_id();
       public          postgres    false            �            1255    57600    set_default_text()    FUNCTION     �   CREATE FUNCTION public.set_default_text() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.text := NEW.title;
    RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.set_default_text();
       public          postgres    false            �            1259    32983    USER    TABLE     $  CREATE TABLE public."USER" (
    user_id character(15) NOT NULL,
    account character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    real_name character varying(20) NOT NULL,
    nick_name character varying(20) NOT NULL,
    address character varying(50) NOT NULL
);
    DROP TABLE public."USER";
       public         heap    postgres    false            �            1259    49420    announcements_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.announcements_id_seq
    START WITH 11
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.announcements_id_seq;
       public          postgres    false            �            1259    41188    announcements    TABLE     B  CREATE TABLE public.announcements (
    announcements_id character(15) DEFAULT nextval('public.announcements_id_seq'::regclass) NOT NULL,
    content character varying(2000) NOT NULL,
    category character varying(20) NOT NULL,
    publisher character(15) DEFAULT 'admin'::bpchar NOT NULL,
    date date DEFAULT CURRENT_DATE,
    attach character varying(100),
    title character varying(15),
    show_in_calendar boolean DEFAULT true,
    start_date date,
    end_date date,
    text character varying(15),
    CONSTRAINT valid_date_range CHECK ((end_date >= start_date))
);
 !   DROP TABLE public.announcements;
       public         heap    postgres    false    227            �            1259    33032    chat    TABLE     �   CREATE TABLE public.chat (
    chat_sender_id character(15) NOT NULL,
    chat_receiver_id character(15) NOT NULL,
    chat_time timestamp without time zone NOT NULL,
    content character varying(9999) NOT NULL
);
    DROP TABLE public.chat;
       public         heap    postgres    false            �            1259    49464    feedback    TABLE     �  CREATE TABLE public.feedback (
    feedback_id character(15) DEFAULT public.generate_feedback_id() NOT NULL,
    feedback_user_id character(15),
    announcement_id character(15),
    content character varying(200) NOT NULL,
    feedback_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reply_id character(15) DEFAULT NULL::bpchar,
    CONSTRAINT check_reply_id_not_self CHECK (((reply_id IS NULL) OR (reply_id <> feedback_id)))
);
    DROP TABLE public.feedback;
       public         heap    postgres    false    233            �            1259    49441    feedback_id_seq    SEQUENCE     x   CREATE SEQUENCE public.feedback_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.feedback_id_seq;
       public          postgres    false            �            1259    33080    gas_meter_reading    TABLE     �   CREATE TABLE public.gas_meter_reading (
    user_id character(15) NOT NULL,
    meter_readings integer,
    read_or_not boolean NOT NULL
);
 %   DROP TABLE public.gas_meter_reading;
       public         heap    postgres    false            �            1259    33090    management_fee    TABLE     �   CREATE TABLE public.management_fee (
    user_id character(15) NOT NULL,
    fee_time date NOT NULL,
    payment_status boolean,
    payment_deadline date,
    fee_amount integer NOT NULL
);
 "   DROP TABLE public.management_fee;
       public         heap    postgres    false            �            1259    41214    notification_id_seq    SEQUENCE     |   CREATE SEQUENCE public.notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.notification_id_seq;
       public          postgres    false            �            1259    49540    notifications    TABLE        CREATE TABLE public.notifications (
    id integer NOT NULL,
    title character varying(255),
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    account character varying(20),
    details text,
    hasdot boolean DEFAULT true NOT NULL
);
 !   DROP TABLE public.notifications;
       public         heap    postgres    false            �            1259    49539    notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.notifications_id_seq;
       public          postgres    false    231            d           0    0    notifications_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;
          public          postgres    false    230            �            1259    33049    package_letter_record    TABLE     �  CREATE TABLE public.package_letter_record (
    record_id character(15) NOT NULL,
    receiver_id character(15) NOT NULL,
    notification_time timestamp without time zone NOT NULL,
    collection_time timestamp without time zone,
    collection_status character varying(20),
    CONSTRAINT package_letter_record_collection_status_check CHECK (((collection_status)::text = ANY ((ARRAY['Collected'::character varying, 'Uncollected'::character varying])::text[])))
);
 )   DROP TABLE public.package_letter_record;
       public         heap    postgres    false            �            1259    33106    parking_reserved_record    TABLE       CREATE TABLE public.parking_reserved_record (
    reserved_record_id character(15) NOT NULL,
    user_id character(15) NOT NULL,
    parking_space_id character(15) NOT NULL,
    begin_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    total_fee integer,
    payment_status character varying(20),
    CONSTRAINT parking_reserved_record_payment_status_check CHECK (((payment_status)::text = ANY ((ARRAY['Paid'::character varying, 'Unpaid'::character varying])::text[])))
);
 +   DROP TABLE public.parking_reserved_record;
       public         heap    postgres    false            �            1259    33100    parking_space    TABLE     +  CREATE TABLE public.parking_space (
    parking_space_id character(15) NOT NULL,
    time_period interval,
    status character varying(20),
    CONSTRAINT parking_space_status_check CHECK (((status)::text = ANY ((ARRAY['Reserved'::character varying, 'Unreserved'::character varying])::text[])))
);
 !   DROP TABLE public.parking_space;
       public         heap    postgres    false            �            1259    33060    public_utilities    TABLE       CREATE TABLE public.public_utilities (
    utilities_id character(15) NOT NULL,
    utilities_name character varying(100) NOT NULL,
    opening_hours_begin time without time zone NOT NULL,
    opening_hours_end time without time zone NOT NULL,
    picture character varying(100)
);
 $   DROP TABLE public.public_utilities;
       public         heap    postgres    false            �            1259    33065    public_utilities_reserved    TABLE     �   CREATE TABLE public.public_utilities_reserved (
    utilities_id character(15) NOT NULL,
    reserved_user_id character(15) NOT NULL,
    date date,
    start_time time with time zone NOT NULL,
    end_time time with time zone NOT NULL
);
 -   DROP TABLE public.public_utilities_reserved;
       public         heap    postgres    false            �            1259    33122    repair_report    TABLE     .  CREATE TABLE public.repair_report (
    repair_report_id character(15) NOT NULL,
    report_user_id character(15),
    repair_type character varying(20) NOT NULL,
    description character varying(9999) NOT NULL,
    repair_report_time timestamp without time zone NOT NULL,
    repair_progress character varying(20),
    picture character varying(100),
    CONSTRAINT repair_report_repair_progress_check CHECK (((repair_progress)::text = ANY ((ARRAY['Unchecked'::character varying, 'Ongoing'::character varying, 'Finished'::character varying])::text[])))
);
 !   DROP TABLE public.repair_report;
       public         heap    postgres    false            �           2604    49543    notifications id    DEFAULT     t   ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);
 ?   ALTER TABLE public.notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    231    231            M          0    32983    USER 
   TABLE DATA           [   COPY public."USER" (user_id, account, password, real_name, nick_name, address) FROM stdin;
    public          postgres    false    215   �g       W          0    41188    announcements 
   TABLE DATA           �   COPY public.announcements (announcements_id, content, category, publisher, date, attach, title, show_in_calendar, start_date, end_date, text) FROM stdin;
    public          postgres    false    225   �h       N          0    33032    chat 
   TABLE DATA           T   COPY public.chat (chat_sender_id, chat_receiver_id, chat_time, content) FROM stdin;
    public          postgres    false    216   n       [          0    49464    feedback 
   TABLE DATA           t   COPY public.feedback (feedback_id, feedback_user_id, announcement_id, content, feedback_time, reply_id) FROM stdin;
    public          postgres    false    229   �n       R          0    33080    gas_meter_reading 
   TABLE DATA           Q   COPY public.gas_meter_reading (user_id, meter_readings, read_or_not) FROM stdin;
    public          postgres    false    220   �n       S          0    33090    management_fee 
   TABLE DATA           i   COPY public.management_fee (user_id, fee_time, payment_status, payment_deadline, fee_amount) FROM stdin;
    public          postgres    false    221   o       ]          0    49540    notifications 
   TABLE DATA           R   COPY public.notifications (id, title, date, account, details, hasdot) FROM stdin;
    public          postgres    false    231   Yo       O          0    33049    package_letter_record 
   TABLE DATA           ~   COPY public.package_letter_record (record_id, receiver_id, notification_time, collection_time, collection_status) FROM stdin;
    public          postgres    false    217   �r       U          0    33106    parking_reserved_record 
   TABLE DATA           �   COPY public.parking_reserved_record (reserved_record_id, user_id, parking_space_id, begin_time, end_time, total_fee, payment_status) FROM stdin;
    public          postgres    false    223   <s       T          0    33100    parking_space 
   TABLE DATA           N   COPY public.parking_space (parking_space_id, time_period, status) FROM stdin;
    public          postgres    false    222   �s       P          0    33060    public_utilities 
   TABLE DATA           y   COPY public.public_utilities (utilities_id, utilities_name, opening_hours_begin, opening_hours_end, picture) FROM stdin;
    public          postgres    false    218   t       Q          0    33065    public_utilities_reserved 
   TABLE DATA           o   COPY public.public_utilities_reserved (utilities_id, reserved_user_id, date, start_time, end_time) FROM stdin;
    public          postgres    false    219   �t       V          0    33122    repair_report 
   TABLE DATA           �   COPY public.repair_report (repair_report_id, report_user_id, repair_type, description, repair_report_time, repair_progress, picture) FROM stdin;
    public          postgres    false    224   �t       e           0    0    announcements_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.announcements_id_seq', 36, true);
          public          postgres    false    227            f           0    0    feedback_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.feedback_id_seq', 1, false);
          public          postgres    false    228            g           0    0    notification_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.notification_id_seq', 1, true);
          public          postgres    false    226            h           0    0    notifications_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.notifications_id_seq', 46, true);
          public          postgres    false    230            �           2606    32987    USER USER_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."USER" DROP CONSTRAINT "USER_pkey";
       public            postgres    false    215            �           2606    33038    chat chat_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (chat_sender_id, chat_receiver_id, chat_time);
 8   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_pkey;
       public            postgres    false    216    216    216            �           2606    49470    feedback feedback_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedback_id);
 @   ALTER TABLE ONLY public.feedback DROP CONSTRAINT feedback_pkey;
       public            postgres    false    229            �           2606    33084 (   gas_meter_reading gas_meter_reading_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.gas_meter_reading
    ADD CONSTRAINT gas_meter_reading_pkey PRIMARY KEY (user_id);
 R   ALTER TABLE ONLY public.gas_meter_reading DROP CONSTRAINT gas_meter_reading_pkey;
       public            postgres    false    220            �           2606    33094 "   management_fee management_fee_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.management_fee
    ADD CONSTRAINT management_fee_pkey PRIMARY KEY (user_id, fee_time);
 L   ALTER TABLE ONLY public.management_fee DROP CONSTRAINT management_fee_pkey;
       public            postgres    false    221    221            �           2606    41192    announcements notification_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT notification_pkey PRIMARY KEY (announcements_id);
 I   ALTER TABLE ONLY public.announcements DROP CONSTRAINT notification_pkey;
       public            postgres    false    225            �           2606    49548     notifications notifications_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public            postgres    false    231            �           2606    33054 0   package_letter_record package_letter_record_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.package_letter_record
    ADD CONSTRAINT package_letter_record_pkey PRIMARY KEY (record_id);
 Z   ALTER TABLE ONLY public.package_letter_record DROP CONSTRAINT package_letter_record_pkey;
       public            postgres    false    217            �           2606    33111 4   parking_reserved_record parking_reserved_record_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.parking_reserved_record
    ADD CONSTRAINT parking_reserved_record_pkey PRIMARY KEY (reserved_record_id);
 ^   ALTER TABLE ONLY public.parking_reserved_record DROP CONSTRAINT parking_reserved_record_pkey;
       public            postgres    false    223            �           2606    33105     parking_space parking_space_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.parking_space
    ADD CONSTRAINT parking_space_pkey PRIMARY KEY (parking_space_id);
 J   ALTER TABLE ONLY public.parking_space DROP CONSTRAINT parking_space_pkey;
       public            postgres    false    222            �           2606    33064 &   public_utilities public_utilities_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.public_utilities
    ADD CONSTRAINT public_utilities_pkey PRIMARY KEY (utilities_id);
 P   ALTER TABLE ONLY public.public_utilities DROP CONSTRAINT public_utilities_pkey;
       public            postgres    false    218            �           2606    33129     repair_report repair_report_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.repair_report
    ADD CONSTRAINT repair_report_pkey PRIMARY KEY (repair_report_id);
 J   ALTER TABLE ONLY public.repair_report DROP CONSTRAINT repair_report_pkey;
       public            postgres    false    224            �           1259    49538    idx_unique_account    INDEX     O   CREATE UNIQUE INDEX idx_unique_account ON public."USER" USING btree (account);
 &   DROP INDEX public.idx_unique_account;
       public            postgres    false    215            �           2620    57601 &   announcements set_default_text_trigger    TRIGGER     �   CREATE TRIGGER set_default_text_trigger BEFORE INSERT ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.set_default_text();
 ?   DROP TRIGGER set_default_text_trigger ON public.announcements;
       public          postgres    false    232    225            �           2606    33044    chat chat_chat_receiver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_chat_receiver_id_fkey FOREIGN KEY (chat_receiver_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_chat_receiver_id_fkey;
       public          postgres    false    215    216    4758            �           2606    33039    chat chat_chat_sender_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_chat_sender_id_fkey FOREIGN KEY (chat_sender_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_chat_sender_id_fkey;
       public          postgres    false    216    215    4758            �           2606    49476 &   feedback feedback_announcement_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_announcement_id_fkey FOREIGN KEY (announcement_id) REFERENCES public.announcements(announcements_id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.feedback DROP CONSTRAINT feedback_announcement_id_fkey;
       public          postgres    false    225    229    4777            �           2606    49471 '   feedback feedback_feedback_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_feedback_user_id_fkey FOREIGN KEY (feedback_user_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.feedback DROP CONSTRAINT feedback_feedback_user_id_fkey;
       public          postgres    false    229    4758    215            �           2606    49482    feedback feedback_reply_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_reply_id_fkey FOREIGN KEY (reply_id) REFERENCES public.feedback(feedback_id) ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;
 I   ALTER TABLE ONLY public.feedback DROP CONSTRAINT feedback_reply_id_fkey;
       public          postgres    false    229    229    4779            �           2606    41215    announcements fk_publisher    FK CONSTRAINT     �   ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT fk_publisher FOREIGN KEY (publisher) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.announcements DROP CONSTRAINT fk_publisher;
       public          postgres    false    215    4758    225            �           2606    33085 0   gas_meter_reading gas_meter_reading_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.gas_meter_reading
    ADD CONSTRAINT gas_meter_reading_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Z   ALTER TABLE ONLY public.gas_meter_reading DROP CONSTRAINT gas_meter_reading_user_id_fkey;
       public          postgres    false    220    4758    215            �           2606    33095 *   management_fee management_fee_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.management_fee
    ADD CONSTRAINT management_fee_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.management_fee DROP CONSTRAINT management_fee_user_id_fkey;
       public          postgres    false    221    4758    215            �           2606    49549 (   notifications notifications_account_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_account_fkey FOREIGN KEY (account) REFERENCES public."USER"(account) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_account_fkey;
       public          postgres    false    215    4759    231            �           2606    33055 <   package_letter_record package_letter_record_receiver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.package_letter_record
    ADD CONSTRAINT package_letter_record_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.package_letter_record DROP CONSTRAINT package_letter_record_receiver_id_fkey;
       public          postgres    false    215    4758    217            �           2606    33117 E   parking_reserved_record parking_reserved_record_parking_space_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parking_reserved_record
    ADD CONSTRAINT parking_reserved_record_parking_space_id_fkey FOREIGN KEY (parking_space_id) REFERENCES public.parking_space(parking_space_id) ON UPDATE CASCADE ON DELETE CASCADE;
 o   ALTER TABLE ONLY public.parking_reserved_record DROP CONSTRAINT parking_reserved_record_parking_space_id_fkey;
       public          postgres    false    4771    223    222            �           2606    33112 <   parking_reserved_record parking_reserved_record_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parking_reserved_record
    ADD CONSTRAINT parking_reserved_record_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.parking_reserved_record DROP CONSTRAINT parking_reserved_record_user_id_fkey;
       public          postgres    false    223    4758    215            �           2606    33075 I   public_utilities_reserved public_utilities_reserved_reserved_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.public_utilities_reserved
    ADD CONSTRAINT public_utilities_reserved_reserved_user_id_fkey FOREIGN KEY (reserved_user_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 s   ALTER TABLE ONLY public.public_utilities_reserved DROP CONSTRAINT public_utilities_reserved_reserved_user_id_fkey;
       public          postgres    false    219    215    4758            �           2606    33070 E   public_utilities_reserved public_utilities_reserved_utilities_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.public_utilities_reserved
    ADD CONSTRAINT public_utilities_reserved_utilities_id_fkey FOREIGN KEY (utilities_id) REFERENCES public.public_utilities(utilities_id) ON UPDATE CASCADE ON DELETE CASCADE;
 o   ALTER TABLE ONLY public.public_utilities_reserved DROP CONSTRAINT public_utilities_reserved_utilities_id_fkey;
       public          postgres    false    219    218    4765            �           2606    33130 /   repair_report repair_report_report_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.repair_report
    ADD CONSTRAINT repair_report_report_user_id_fkey FOREIGN KEY (report_user_id) REFERENCES public."USER"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.repair_report DROP CONSTRAINT repair_report_report_user_id_fkey;
       public          postgres    false    4758    224    215            M   �   x�KL���S��D�UZ�Zo�P�l`j`��_���XRlna�锟�����W��b'Ur:>����b�z�3�>[1���gC�2B��d`�YX�ZTRibj�镘�����
f��0a4�����C΂������C#cN��s3K2�L��W<�� ������ ,�]8      W   e  x��W�R"I>�S�hЍ���ٽ�pو����z��0�v-��"=��(��,"��0vVW�|���j��q�5�����̬����ؐ�>��>��&��h$r�����?nz敀\��%E��H�GY�UI{�K؍���~��ݼg�ygYb~��]�o��< ��wI�%bjP��G5�o9��%%��A�dŇ�|�3�Z�� W�p�n_��$��ه1:��R%�ڤ�+�5H�C�5����|�h�ޅ�6��%�"�}[
��HʚD�+T��
�>��nGX$N���=���qDG;pz���iπ�g���QP�X=+,����T����������Ί[��H!��{8�0	�nu���O��X�KNV��b_q�}:#���|R'!7����(i�"'�c8���,a���
��Ac<�,KV�F��ٚ��`[�������0�|,��_�j����MV0J� �C:�B�Hs<��'m�#��:+����� �4�B
�x1��]�Ʊ�lɎ��,�k���f	��8<�Wm������S?26�!�K�rh�'~
-��R ���qD� Ëԕ���CV�Y܏��J&.N�{;������<鮾)]�Ǥ�Lҕg�}A[�~��v��e�k����5�r�/�Y N~�\CZ�����B}�Q�oi�X?�	ި�v�ڴ&�|���ڄr�#	�����OK��4�Н҃^p��n<�'�m�oN��	Hc���c=��c�?yu�cT��s8����k؋-F�8�\�+��cC��T�q��v�Ta��Kk��N�5���@u�V��VgLRi�W0r�!I/���L�"�O��@�ˡ�7�!F$�}�J��:��޾��ix��^"'��p�g����"�Fb)��`eu����̒��sH���;	?��h������:�ü%`M5QJ���j��1ϭaQl�9��f�y�o���b�n��*����R&�NJ�~��V���e����aG�̹KtG�	Z�L�.����tDYw�����;��$�=�n�F�����j+�����#/&�L����'!��q�}�+D�?���"����^�[� e�m�fɺ���5��t��10�?N��]��H�'���LIJwpWA�N����ݦ��,�0�C7�"A���A�*�Кf�� ^��&*>�O��ޥA�F��鹇lB<���DlFz?��^�]�h��F����	�X�;�n�Jxz.��$��o.p��:b�����┑u|)
b�楏ܭOv�I��u��U�Zm64X�A�=�O`%�!�zF�da�ڠ+жX�������&"a�����i�j����=�	�M^e��Z����tmé      N   �   x�����0Eg����J���&���%��P��Kc�	��/o�w8�xG��s�9�f�q�d�$/��Sx���<f":���2;\�=ۚ'f�:Ƥ��v�t�ڧl����_3����b(;C�����M,��1���&�0h���H�	s;)8�ӤV��]S��T9K�      [      x������ � �      R   +   x�+-N-�7T�NC��R����)\�!jV���� 3�b      S   7   x�+-N-�7T�N##]S]C3�8�ؐ�Ԁ�����4lJ��25F��� ��      ]   d  x����N�P���S��̜�o;`�m��Jm�.ʪRw���%� �JE�*�D�[������
�ئ�>��Yd���3��	-����Ǘ��	}f���}�5�H����&@j��+���XGi���Ҳ����ٲ��Խ���?�s��I�?��v?�gM��1ڝא�&w�7������+��ۘ0���hy��߫V�ۉ?ߤG	�W�Og���^���M��^���;�-��PtƠs��B���1��)Q������[]�^��[��>�y�5��:�j{��6��)�(<{9^r�C"��ߠ3;h-�8W/O��R{�𑑌�t�j���D4��	��s�!��P�'�DCg���� |L����0wْ�"�Pr]�Ѭ*iRyDE�=<"�<�,W���%��N��N�촡��]=x7;�*\=�d'K����J�a��f���T�\�ƬI�K�g��[D���R�E+�<s�/'��U�/�J�vLq�h
X�0���
XaW�THt�A��|�mOF��0(g��'2�q�NDd1(Yc���'-�i;��Np�!InQ�a-�lu��m��y���l`4TƼq�.4��lD
;�<;��H�<��������Zx�=�M�rmpGyL�/�%w���}��'�a2�T��������˧���=��0�x��,�}��UUm��(�w'�;QQ(���(H9T &
h�	��J�ü<V:a W�p��C1V�0LH3L̻�U~'}8y�s�_L�!ϬB�0�	ꦩ9H�q���?y�lFKu��>i���L0�d�e`�<IG[�-���P�3�v�)���iM�@��v?m���az�      O   _   x�+JM�/J1T����Ԣx8W�����D��T��L���
��L�,,�M-�9c�8C��srR�KRS���&��dD�Ix����7F5ߘ���qqq �69      U   y   x���=
�0�=E/��-�S��	Rj���W�Xu3dy/�GRKQ]#�-��Jl��	HW`*�
�C� j6ذ-'R .�ى�O�L��7C��1�0������� [ }���R�kvA�      T   =   x�+.HLN5T�NC���JΠ��Ԣ���b��B�$]��W������nB� ��P      P   m   x�+-��100R�Π�⒢��\N3+ �42�2��RzY�\�`}�p}!E��
N�y�`�`��V��@�Y��O��C�i��lN���[�i`�	3n]� �L/&      Q   :   x�+-��100T����Ԣx8W�����D��T�Ќ����� ��,8�l�=... )��      V   �   x��λ��0������88+D����j萐qf�Q��}`yD4p��m�\�c���՞Pv�
j��Þ�Rs���mF �X#4]���<�� +���b���]��Zqn��D���]�{�ף�B�z�
�6�
����m��p�(n�:�5X�������zXX�l١�Hh��#.C���X~���t���6M���ya�     